'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/VoidEffect.module.css';

gsap.registerPlugin(ScrollTrigger);

interface VoidEffectProps {
  imageSrc: string;
  overlayImageSrc?: string;
  children: React.ReactNode;
}

export default function VoidEffect({ imageSrc, overlayImageSrc, children }: VoidEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const baseLayerRef = useRef<HTMLDivElement>(null);
  const glassLayerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setImageLoaded(true);
    img.src = imageSrc;
  }, [imageSrc]);

  useEffect(() => {
    const container = containerRef.current;
    const baseLayer = baseLayerRef.current;
    const glassLayer = glassLayerRef.current;
    if (!container || !baseLayer || !imageLoaded) return;

    gsap.to(baseLayer, {
      y: 300,
      scale: 1.15,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

    if (glassLayer) {
      gsap.to(glassLayer, {
        y: 300,
        scale: 1.15,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [imageLoaded]);

  return (
    <div ref={containerRef} className={styles.container}>
      <div 
        ref={baseLayerRef}
        className={`${styles.baseLayer} ${imageLoaded ? styles.loaded : ''}`}
        style={{ backgroundImage: `url(${imageSrc})` }}
      />
      {overlayImageSrc && (
        <div 
          ref={glassLayerRef}
          className={`${styles.glassLayer} ${imageLoaded ? styles.loaded : ''}`}
          style={{ backgroundImage: `url(${overlayImageSrc})` }}
        />
      )}
      <div className={styles.gradientOverlay} />
      <div className={styles.particles}>
        {[...Array(20)].map((_, i) => (
          <div key={i} className={styles.particle} />
        ))}
      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}