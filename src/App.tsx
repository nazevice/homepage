

import { useEffect, useRef } from 'react';
import * as anime from 'animejs';
import KatanaWithAura from './KatanaWithAura';

function CenteredRiver() {
  const riverRef = useRef<HTMLDivElement>(null);
  const turbulenceRef = useRef<SVGFETurbulenceElement>(null);
  const displacementRef = useRef<SVGFEDisplacementMapElement>(null);
  const offsetRef = useRef<SVGFEOffsetElement>(null);

  useEffect(() => {
    if (turbulenceRef.current) {
      anime({
        targets: turbulenceRef.current,
        baseFrequency: ['0.002 0.015', '0.002 0.025'],
        duration: 20000,
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
      });
    }

    if (offsetRef.current) {
      anime({
        targets: offsetRef.current,
        dy: [0, 200],
        duration: 15000,
        easing: 'linear',
        loop: true,
      });
    }

    const paths = document.querySelectorAll('.river-path');
    const baseWidths = [8, 6, 4, 7, 5, 3];

    paths.forEach((path, index) => {
      anime({
        targets: path,
        strokeWidth: [
          { value: baseWidths[index] - 2, duration: 7000 + anime.random(0, 3000) },
          { value: baseWidths[index] + 2, duration: 7000 + anime.random(0, 3000) }
        ],
        easing: 'easeInOutSine',
        direction: 'alternate',
        loop: true,
        delay: anime.random(0, 1000)
      });
    });
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!riverRef.current || !displacementRef.current || !turbulenceRef.current) return;

    const rect = riverRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const centerX = rect.width / 2;
    const distance = Math.abs(mouseX - centerX);

    if (distance < 250) {
      const intensity = Math.max(0.1, 1 - (distance / 250));

      anime.remove([displacementRef.current, turbulenceRef.current]);

      anime({
        targets: displacementRef.current,
        scale: 30 + intensity * 20,
        duration: 800,
        easing: 'easeOutQuart',
      });

      anime({
        targets: turbulenceRef.current,
        baseFrequency: `${0.002 + intensity * 0.005} ${0.02 + intensity * 0.03}`,
        duration: 800,
        easing: 'easeOutQuart',
      });
    }
  };

  const handleMouseLeave = () => {
    if (!displacementRef.current || !turbulenceRef.current) return;

    anime.remove([displacementRef.current, turbulenceRef.current]);

    anime({
      targets: displacementRef.current,
      scale: 30,
      duration: 1500,
      easing: 'easeOutElastic(1, .8)',
    });

    anime({
      targets: turbulenceRef.current,
      baseFrequency: '0.002 0.02',
      duration: 1500,
      easing: 'easeOutElastic(1, .8)',
    });
  };

  return (
    <div ref={riverRef} className="flowing-river right-side" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <div className="river-container">
        <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 800 1000">
          <defs>
            <filter id="riverTexture">
              <feTurbulence ref={turbulenceRef} baseFrequency="0.002 0.02" numOctaves="1" seed="2" type="fractalNoise" result="turbulence" />
              <feOffset ref={offsetRef} in="turbulence" dy="0" result="offsetTurbulence" />
              <feDisplacementMap ref={displacementRef} in="SourceGraphic" in2="offsetTurbulence" scale="30" />
              <feGaussianBlur stdDeviation="1.5" />
            </filter>
            <mask id="riverMask">
              <rect width="800" height="1000" fill="black" />
              <rect x="0" y="0" width="800" height="1000" fill="white" />
            </mask>
          </defs>
          <g filter="url(#riverTexture)">
            <image id="koi-1" className="koi-fish" href="/koi.png" width="100" height="100" x="400" y="200" transform="rotate(180 0 0)" />
            <image id="koi-2" className="koi-fish" href="/koi.png" width="100" height="100" x="670" y="700" transform="rotate(10 0 0)" />
          </g>

          <g mask="url(#riverMask)" filter="url(#riverTexture)">
            <path
              className="river-path"
              d="M 595 -50 Q 300 250 550 500 Q 850 750 595 1050"
            />
            <path
              className="river-path"
              d="M 605 -50 Q 350 250 650 500 Q 900 750 605 1050"
            />
            <path
              className="river-path"
              d="M 598 -50 Q 250 250 570 500 Q 950 750 598 1050"
            />
            <path
              className="river-path"
              d="M 602 -50 Q 400 250 630 500 Q 800 750 602 1050"
            />
            <path
              className="river-path"
              d="M 599 -50 Q 320 250 590 500 Q 880 750 599 1050"
            />
            <path
              className="river-path"
              d="M 601 -50 Q 380 250 610 500 Q 820 750 601 1050"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="h-screen w-screen bg-gray-950 overflow-hidden">
      <CenteredRiver />

      <div className="absolute inset-0 flex items-center justify-center">
        <main className="container mx-auto px-4 sm:px-8 lg:px-16">
          <div className="text-left max-w-2xl absolute z-20">
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-4 text-white leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Robert<br />Kommeter
              </h1>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 text-red-700 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Full Stack Software Engineer
              </h2>

              <div className="flex flex-col sm:flex-row sm:justify-start space-y-2 sm:space-y-0 sm:space-x-6 mb-6">
                <a href="https://github.com/nazevice" className="text-gray-200 hover:text-red-700 transition-colors text-base sm:text-lg">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/robertkommeter/" className="text-gray-200 hover:text-red-700 transition-colors text-base sm:text-lg">
                  LinkedIn
                </a>
                <a href="mailto:hello@kommeterr.dev" className="text-gray-200 hover:text-red-700 transition-colors text-base sm:text-lg">
                  hello@kommeterr.dev
                </a>
              </div>
          </div>
          <KatanaWithAura />
        </main>
      </div>
    </div>
  )
}

export default App