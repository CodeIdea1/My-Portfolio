'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/OptimizedBackground.module.css';

interface OptimizedBackgroundProps {
  imageSrc: string;
  children: React.ReactNode;
}

export default function OptimizedBackground({ imageSrc, children }: OptimizedBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const background = backgroundRef.current;
    if (!container || !background) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;

      const moveX = x * 25;
      const moveY = y * 25;
      
      background.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.05)`;
    };

    const handleMouseLeave = () => {
      background.style.transform = 'translate(0px, 0px) scale(1)';
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      <div 
        ref={backgroundRef}
        className={styles.background}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}