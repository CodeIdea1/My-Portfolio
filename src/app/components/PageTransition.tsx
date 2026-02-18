'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';

interface PageTransitionProps {
  isActive: boolean;
  onComplete: () => void;
  cardElement?: HTMLElement | null;
}

const PageTransition: React.FC<PageTransitionProps> = ({ 
  isActive, 
  onComplete, 
  cardElement 
}) => {
  useEffect(() => {
    if (!isActive || !cardElement) return;

    document.body.style.overflow = 'hidden';

    const rect = cardElement.getBoundingClientRect();

    // إخفاء الكروت الأخرى
    const allCards = document.querySelectorAll('.stackedCard');
    allCards.forEach(card => {
      if (card !== cardElement) {
        gsap.to(card, { 
          opacity: 0, 
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    });

    // إخفاء باقي الصفحة
    const sections = document.querySelectorAll('section:not([class*="StackedCards"])');
    sections.forEach(section => {
      gsap.to(section, { 
        opacity: 0, 
        duration: 0.2,
        ease: 'power2.out'
      });
    });

    // إخفاء محتوى الكارت تدريجياً
    const cardContent = cardElement.querySelector('[class*="cardContent"]');
    if (cardContent) {
      gsap.to(cardContent, {
        opacity: 0,
        duration: 0.4,
        ease: 'power2.out'
      });
    }

    // نسخة ثابتة من الكارت
    const clone = cardElement.cloneNode(true) as HTMLElement;
    const cloneContent = clone.querySelector('[class*="cardContent"]') as HTMLElement;
    if (cloneContent) {
      cloneContent.style.opacity = '0';
    }
    
    clone.style.cssText = `
      position: fixed;
      left: ${rect.left}px;
      top: ${rect.top}px;
      width: ${rect.width}px;
      height: ${rect.height}px;
      z-index: 999999;
      margin: 0;
      transform-origin: center center;
      border-radius: ${getComputedStyle(cardElement).borderRadius};
      background-image: ${getComputedStyle(cardElement).backgroundImage};
      background-size: cover;
      background-position: ${getComputedStyle(cardElement).backgroundPosition};
      overflow: hidden;
    `;
    
    cardElement.style.opacity = '0';
    document.body.appendChild(clone);

    // تكبير الكارت
    gsap.to(clone, {
      left: 0,
      top: 0,
      width: '100vw',
      height: '100vh',
      borderRadius: 0,
      duration: 1.2,
      ease: 'power3.inOut'
    });

  }, [isActive, cardElement, onComplete]);

  return null;
};

export default PageTransition;