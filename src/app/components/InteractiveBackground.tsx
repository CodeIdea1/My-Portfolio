'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/InteractiveBackground.module.css';

interface InteractiveBackgroundProps {
  imageSrc: string;
  children: React.ReactNode;
}

export default function InteractiveBackground({ imageSrc, children }: InteractiveBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const image = imageRef.current;
    
    if (!container || !image) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      const moveX = (x - 0.5) * 40;
      const moveY = (y - 0.5) * 40;
      const blur = Math.abs(x - 0.5) * 3 + Math.abs(y - 0.5) * 3;
      const distort = Math.abs(x - 0.5) * 20 + Math.abs(y - 0.5) * 20;
      
      image.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
      image.style.filter = `blur(${blur}px) hue-rotate(${distort}deg) saturate(${1 + distort * 0.01})`;
    };

    const handleMouseLeave = () => {
      image.style.transform = 'translate(0px, 0px) scale(1.05)';
      image.style.filter = 'blur(0px) hue-rotate(0deg) saturate(1)';
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
        ref={imageRef}
        className={styles.backgroundImage}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      <div className={styles.overlay} />
      {children}
    </div>
  );
}