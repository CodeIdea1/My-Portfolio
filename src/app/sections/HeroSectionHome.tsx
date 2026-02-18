'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MainTitles from '../components/MainTitles';
import ParticlesBackground from '../components/ParticlesBackground';
import styles from '../styles/heroSection.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const leftTextRef = useRef<HTMLParagraphElement>(null);
  const rightTextRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedTheme = (localStorage.getItem('theme') || 'dark') as 'light' | 'dark';
    setTheme(savedTheme);

    const handleThemeChange = () => {
      const currentTheme = (document.documentElement.getAttribute('data-theme') || 'dark') as 'light' | 'dark';
      setTheme(currentTheme);
    };

    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !backgroundRef.current || !contentRef.current) return;

    const isMobile = window.innerWidth <= 768;

    const ctx = gsap.context(() => {
      if (isMobile) {
        // الموبايل - أنيميشن سلس بscrub عالي
        gsap.to(backgroundRef.current, {
          y: '20%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 3,
          }
        });

        gsap.to([leftTextRef.current, rightTextRef.current], {
          y: -100,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.5,
          }
        });

        gsap.to(titleRef.current, {
          y: -120,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 2.8,
          }
        });
      } else {
        // أنيميشن الديسكتوب
        gsap.to(backgroundRef.current, {
          y: '30%',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          }
        });

        gsap.to([leftTextRef.current, rightTextRef.current], {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          }
        });

        gsap.to(titleRef.current, {
          y: -200,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 1,
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Mouse move handler for glasses animation - Commented Out
  /* const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    sectionRef.current.style.setProperty('--mouse-x', `${x}%`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}%`);
  }; */

  return (
    <section 
      ref={sectionRef}
      className={styles.heroSection}
      // onMouseMove={handleMouseMove} // Commented out for glasses animation
    >
      <ParticlesBackground />
      <div ref={backgroundRef} className={styles.backgroundContainer}>
        <div 
          className={`${styles.backgroundImage} ${styles.darkImage}`}
          style={{ backgroundImage: 'url(https://res.cloudinary.com/dytwa5cro/image/upload/v1771392962/saja1_wddxmh.svg)', opacity: theme === 'dark' ? 1 : 0 }}
        />
        <div 
          className={`${styles.backgroundImage} ${styles.lightImage}`}
          style={{ backgroundImage: 'url(https://res.cloudinary.com/dytwa5cro/image/upload/v1771392956/saja2_mquwhz.svg)', opacity: theme === 'light' ? 1 : 0 }}
        />
      {/* Glasses Animation - Commented Out */}
      {/* <div className={styles.glassWrapper}>
          <div 
            className={`${styles.hiddenImage} ${styles.darkGlasses}`}
            style={{ backgroundImage: 'url(/whiteGlasses.svg)', opacity: theme === 'dark' ? 1 : 0 }}
          />
          <div 
            className={`${styles.hiddenImage} ${styles.lightGlasses}`}
            style={{ backgroundImage: 'url(/blackGlasses.png)', opacity: theme === 'light' ? 1 : 0 }}
          />
        </div> */}
      </div>
      <div className={styles.overlay} />
      <div ref={contentRef} className={styles.heroContent}>
        <p ref={leftTextRef} className={styles.leftText}>We turn founders' visions into remarkable brands</p>
        <p ref={rightTextRef} className={styles.rightText}>by uniting modern design and performance-driven development under one roof.</p>
        <div ref={titleRef}>
          <MainTitles text="saja jameel" />
        </div>
      </div>
    </section>
  );
}