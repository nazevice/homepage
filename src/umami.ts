// Umami Analytics Utility
declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: any) => void;
    };
  }
}

export const initUmami = (websiteId?: string) => {
  if (typeof window !== 'undefined') {
    const umamiDomain = import.meta.env.VITE_UMAMI_DOMAIN || 'http://localhost:3000';
    const umamiWebsiteId = websiteId || import.meta.env.VITE_UMAMI_WEBSITE_ID || 'your-website-id';

    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.src = `${umamiDomain}/script.js`;
    script.setAttribute('data-website-id', umamiWebsiteId);

    const firstScript = document.getElementsByTagName('script')[0];
    if (firstScript && firstScript.parentNode) {
      firstScript.parentNode.insertBefore(script, firstScript);
    } else {
      document.head.appendChild(script);
    }
  }
};

export const trackEvent = (event: string, data?: any) => {
  if (window.umami) {
    window.umami.track(event, data);
  }
};

export const trackSocialLink = (platform: string) => {
  trackEvent('social_link_click', { platform });
};

export const trackEmailClick = () => {
  trackEvent('email_click');
};