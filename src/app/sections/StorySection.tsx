'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/StorySection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
      // موبايل: بدون أنيميشن
      return;
    }

    const chars = title.querySelectorAll(`.${styles.char}`);
    if (chars.length === 0) return;
    
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
      chars.forEach(char => {
        gsap.set(char, { backgroundSize: '0% 100%' });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: title,
          start: 'top 80%',
          end: 'top 40%',
          scrub: 1,
          onRefresh: (self) => {
            if (!title.parentNode) {
              self.kill(true);
            }
          }
        }
      });

      timelineRef.current = tl;
      scrollTriggerRef.current = tl.scrollTrigger || null;

      chars.forEach((char, index) => {
        tl.to(char, {
          backgroundSize: '100% 100%',
          duration: 0.3,
          ease: 'none'
        }, index * 0.3);
      });
    }, title);

      ctxRef.current = ctx;
    }, 100);

    return () => {
      clearTimeout(timer);
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
        scrollTriggerRef.current = null;
      }

      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach(trigger => {
        if (trigger.vars.trigger === title) {
          trigger.kill(true);
        }
      });

      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }

      chars.forEach(char => {
        try {
          if (char && document.body.contains(char)) {
            gsap.set(char, { clearProps: 'all' });
          }
        } catch (e) {
          // تجاهل الأخطاء إذا كان العنصر محذوف
        }
      });

      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  const text = "We began under one roof. COVID sent us remote. Somehow the work got better. Today we're a global circle of creatives with one mindset.";

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
    <section className={styles.section}>
      <div className={styles.container}>
        <h1 ref={titleRef} className={styles.storyTitle}>
          {renderChars()}
        </h1>
      </div>
    </section>
  );
}