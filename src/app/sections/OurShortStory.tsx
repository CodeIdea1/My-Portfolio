'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/OurShortStory.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function OurShortStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const shadowRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const shadow = shadowRef.current;

    if (!section || !image || !shadow) return;

    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        ScrollTrigger.normalizeScroll(true);
      }
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=200%' : '+=100%',
          scrub: isMobile ? 0.5 : 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: false,
          fastScrollEnd: true,
          preventOverlaps: true,
          onRefresh: (self) => {
            if (!section.parentNode) {
              self.kill(true);
            }
          }
        }
      });

      // ✅ حفظ المراجع
      timelineRef.current = tl;
      scrollTriggerRef.current = tl.scrollTrigger || null;

      tl.fromTo(image, 
        {
          clipPath: 'circle(20% at 50% 50%)',
          scale: 1.1
        },
        {
          clipPath: 'circle(100% at 50% 50%)',
          scale: 1,
          duration: 1,
          ease: 'power2.inOut'
        }
      )
      .fromTo(shadow,
        {
          opacity: 0
        },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut'
        },
        '-=0.3'
      );
    }, section);

      ctxRef.current = ctx;
    }, 100);

    // ✅ Cleanup نهائي وشامل
    return () => {
      clearTimeout(timer);
      // 1️⃣ إيقاف Timeline أولاً
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }

      // 2️⃣ حذف ScrollTrigger
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill(true);
        scrollTriggerRef.current = null;
      }

      // 3️⃣ حذف كل ScrollTriggers المرتبطة بالـ section
      const allTriggers = ScrollTrigger.getAll();
      allTriggers.forEach(trigger => {
        if (trigger.vars.trigger === section) {
          trigger.kill(true);
        }
      });

      // 4️⃣ Revert الـ Context
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }

      // 5️⃣ تنظيف الـ styles بأمان
      try {
        if (image && document.body.contains(image)) {
          gsap.set(image, { clearProps: 'all' });
        }
      } catch (e) {
        // تجاهل الأخطاء إذا كان العنصر محذوف
      }

      try {
        if (shadow && document.body.contains(shadow)) {
          gsap.set(shadow, { clearProps: 'all' });
        }
      } catch (e) {
        // تجاهل الأخطاء إذا كان العنصر محذوف
      }

      // 6️⃣ Refresh ScrollTrigger بعد التنظيف
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.storySection}>
      <div className={styles.overlay}></div>
      <img ref={imageRef} src="https://res.cloudinary.com/dytwa5cro/image/upload/v1771395470/Focused_Group_Discussion_aafpm3.png" alt="Ammar" className={styles.storyImage} />
      <div ref={shadowRef} className={styles.bottomShadow}></div>
    </section>
  );
}