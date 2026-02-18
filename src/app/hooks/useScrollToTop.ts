'use client';

import { useEffect } from 'react';

export const useScrollToTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.classList.add('loaded');
  }, []);
};