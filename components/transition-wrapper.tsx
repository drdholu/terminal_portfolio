import React, { useEffect, useRef, ReactNode } from 'react';
import { useRouter } from 'next/router';
import gsap from 'gsap';

interface TransitionWrapperProps {
  children: ReactNode;
}

const TransitionWrapper: React.FC<TransitionWrapperProps> = ({ children }) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { xPercent: -100 });
      tl.to(overlayRef.current, {
        xPercent: 0,
        duration: 1.3,
        ease: 'power2.out',
      });
    };

    const handleRouteChangeComplete = () => {
      const tl = gsap.timeline();
      tl.to(overlayRef.current, {
        xPercent: 100,
        duration: 1.3,
        ease: 'power2.in',
        delay: 0.1,
        onComplete: () => {
          gsap.set(overlayRef.current, { xPercent: -100 });
        },
      }).fromTo(
        contentRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.5'
      );
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <div className="relative">
      <div
        ref={overlayRef}
        className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-gray-900"
      >
        <h1 className="text-3xl text-white md:text-5xl">BY THE ARTIST</h1>
        <h1 className="text-3xl text-white md:text-5xl">FOR THE ARTIST</h1>
      </div>
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  );
};

export default TransitionWrapper;
