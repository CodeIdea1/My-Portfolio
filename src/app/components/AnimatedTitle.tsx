'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/AnimatedTitle.module.css';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

export default function AnimatedTitle({ text, className = '' }: AnimatedTitleProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const chars = title.querySelectorAll(`.${styles.char}`);
    const totalChars = chars.length;
    
    chars.forEach((char, index) => {
      gsap.to(char, {
        backgroundSize: '100% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: title,
          start: 'top 90%',
          end: 'top 60%',
          scrub: true,
          onUpdate: (self) => {
            const progress = self.progress;
            const charProgress = (progress * totalChars) - index;
            const clampedProgress = Math.max(0, Math.min(1, charProgress));
            gsap.set(char, { backgroundSize: `${clampedProgress * 100}% 100%` });
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const renderChars = () => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={styles.char}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <h1 ref={titleRef} className={`${styles.animatedTitle} ${className}`}>
      {renderChars()}
    </h1>
  );
}