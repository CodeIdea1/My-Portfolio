'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import styles from '../styles/CustomCursor.module.css';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorTextRef = useRef<HTMLDivElement>(null);
  const [showText, setShowText] = useState(false);
  const [isCard, setIsCard] = useState(false);

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    const cursorText = cursorTextRef.current;
    
    if (!cursor || !cursorDot || !cursorText) return;

    gsap.set([cursor, cursorDot, cursorText], { xPercent: -50, yPercent: -50 });

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power2.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power2.out" });
    const xDotTo = gsap.quickTo(cursorDot, "x", { duration: 0.05, ease: "none" });
    const yDotTo = gsap.quickTo(cursorDot, "y", { duration: 0.05, ease: "none" });
    const xTextTo = gsap.quickTo(cursorText, "x", { duration: 0.15, ease: "power2.out" });
    const yTextTo = gsap.quickTo(cursorText, "y", { duration: 0.15, ease: "power2.out" });

    const checkHover = (target: HTMLElement) => {
      const isContactLink = target.closest('[class*="contactLink"]');
      const isStackedCard = target.closest('.stackedCard');

      setShowText(!!isContactLink);
      setIsCard(!!isStackedCard);
    };

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xTextTo(e.clientX);
      yTextTo(e.clientY);
      checkHover(e.target as HTMLElement);
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      gsap.killTweensOf([cursor, cursorDot, cursorText]);
    };
  }, []);

  return (
    <>
      <div ref={cursorRef} className={`${styles.cursor} ${(showText || isCard) ? styles.cursorHover : ''}`} />
      <div ref={cursorDotRef} className={`${styles.cursorDot} ${(showText || isCard) ? styles.cursorDotHover : ''}`} />
      <div ref={cursorTextRef} className={`${styles.cursorText} ${(showText || isCard) ? styles.cursorTextHover : ''}`}>
        {showText ? '[Say Hey]' : isCard ? '[OPEN]' : ''}
      </div>
    </>
  );
}