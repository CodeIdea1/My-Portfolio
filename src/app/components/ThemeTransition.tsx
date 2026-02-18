'use client';

import { useEffect, useState } from 'react';
import styles from '../styles/ThemeTransition.module.css';

export default function ThemeTransition() {
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setIsTransitioning(true);
          setTimeout(() => setIsTransitioning(false), 600);
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`${styles.themeTransition} ${isTransitioning ? styles.active : ''}`}>
      <div className={styles.fadeOverlay}></div>
    </div>
  );
}
