'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionCard, setTransitionCard] = useState<HTMLElement | null>(null);
  const router = useRouter();

  const navigateWithTransition = useCallback((url: string, cardElement: HTMLElement, preloadedFrame?: HTMLIFrameElement) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionCard(cardElement);

    // الانتقال بعد اكتمال انيميشن التكبير
    setTimeout(() => {
      if (url.startsWith('http')) {
        window.location.href = url;
      } else {
        router.push(url);
      }
    }, 1200);
  }, [isTransitioning, router]);

  const completeTransition = useCallback(() => {
    setIsTransitioning(false);
    setTransitionCard(null);
  }, []);

  return {
    isTransitioning,
    transitionCard,
    navigateWithTransition,
    completeTransition
  };
};