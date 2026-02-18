/* GlassImage Component - Commented Out - All code related to glasses animation */

/*
'use client';

import { useRef } from 'react';
import styles from '../styles/GlassImage.module.css';

interface GlassImageProps {
  imageSrc: string;
}

export default function GlassImage({ imageSrc }: GlassImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty('--mouse-x', `${x}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <div 
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
    >
      <div 
        className={styles.background}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
    </div>
  );
}
*/

// Placeholder export to prevent import errors
export default function GlassImage() {
  return null;
}
