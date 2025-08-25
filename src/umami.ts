import type { MouseEvent as ReactMouseEvent } from 'react';

const UMAMI_SCRIPT_ID = 'umami-script';
const UMAMI_SCRIPT_PATH = 'script.js';
const TRACK_FLUSH_DELAY_MS = 120;
const NAVIGATION_DELAY_MS = 50;

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: any) => void;
    };
  }
}

type UmamiConfig = {
  domain: string;
  websiteId: string;
};

const getUmamiConfig = (websiteId?: string): UmamiConfig | null => {
  const domain = import.meta.env.VITE_UMAMI_DOMAIN as string | undefined;
  const id = websiteId || (import.meta.env.VITE_UMAMI_WEBSITE_ID as string | undefined);
  if (!domain || !id) return null;
  return { domain, websiteId: id };
};

const ensureScriptInjected = (config: UmamiConfig): void => {
  if (document.getElementById(UMAMI_SCRIPT_ID)) return;
  const script = document.createElement('script');
  script.id = UMAMI_SCRIPT_ID;
  script.async = true;
  script.defer = true;
  script.src = `${config.domain}/${UMAMI_SCRIPT_PATH}`;
  script.setAttribute('data-website-id', config.websiteId);
  script.onerror = () => console.error('Failed to load Umami script');
  const firstScript = document.getElementsByTagName('script')[0];
  if (firstScript && firstScript.parentNode) {
    firstScript.parentNode.insertBefore(script, firstScript);
  } else {
    document.head.appendChild(script);
  }
};

export const initUmami = (websiteId?: string) => {
  if (typeof window !== 'undefined') {
    const config = getUmamiConfig(websiteId);
    if (!config) return;
    ensureScriptInjected(config);
  }
};

export const trackEvent = async (event: string, data?: any): Promise<void> => {
  return new Promise((resolve) => {
    if (window.umami) {
      try {
        window.umami.track(event, data);
        setTimeout(resolve, TRACK_FLUSH_DELAY_MS);
      } catch (error) {
        console.error('Error tracking event:', error);
        resolve();
      }
    } else {
      console.error('Umami not initialized');
      resolve();
    }
  });
};

export const trackSocialLink = async (platform: string): Promise<void> => {
  return trackEvent('social_link_click', { platform });
};

export const trackEmailClick = async (): Promise<void> => {
  return trackEvent('email_click');
};

export const handleLinkClick = async (
  event: ReactMouseEvent<HTMLAnchorElement>,
  trackingFunction: () => Promise<void>
) => {
  const isLeftClick = event.button === 0;
  const isMiddleClick = event.button === 1;
  const isRightClick = event.type === 'contextmenu';
  const isKeyboardModifier = event.ctrlKey || event.metaKey || event.shiftKey;

  if (isRightClick) {
    void trackingFunction();
    return;
  }
  if (isMiddleClick || isKeyboardModifier) {
    void trackingFunction();
    return;
  }
  if (isLeftClick) {
    event.preventDefault();
    const href = event.currentTarget.href;
    
    try {
      await Promise.race([
        trackingFunction(),
        new Promise(resolve => setTimeout(resolve, 200))
      ]);
    } catch (error) {
      console.error('Tracking failed:', error);
    }
    
    setTimeout(() => {
      window.location.assign(href);
    }, NAVIGATION_DELAY_MS);
  }
};