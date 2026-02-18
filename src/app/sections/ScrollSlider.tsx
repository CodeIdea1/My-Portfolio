

'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ScrollSlider.module.css';
import AnimatedTitle from '../components/AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

// تحسين الأداء
gsap.config({ force3D: true });

const brands = [
  { id: 1, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392196/W-1_xcyd6u.webp' },
  { id: 2, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392199/W-2_fmxd1k.webp' },
  { id: 3, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392200/W-3_rr8kzo.webp' },
  { id: 5, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392202/W-5_jxkxme.webp' },
  { id: 6, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392203/W-6_jonlf1.webp' },
  { id: 7, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392193/W-7_wvgb2m.webp' },
  { id: 8, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392193/W-8_mpgylw.webp' },
  { id: 9, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392193/W-9_edvdeg.webp' },
  { id: 10, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392194/W-10_pmfmys.webp' },
  { id: 11, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392197/W-11_ewttni.webp' },
  { id: 12, image: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392201/W-12_v1sj6h.webp' }
];

export default function ScrollSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const scrollTriggersRef = useRef<ScrollTrigger[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const row1 = row1Ref.current;
    const row2 = row2Ref.current;

    if (!section || !row1 || !row2) return;

    // تحسين الأداء مع WebGL
    [row1, row2].forEach(row => {
      row.style.willChange = 'transform';
      row.style.backfaceVisibility = 'hidden';
      row.style.perspective = '1000px';
    });
    
    gsap.set([row1, row2], { force3D: true });
    gsap.set(row1, { x: 0 });
    gsap.set(row2, { x: -1500 });
    
    const tl1 = gsap.to(row1, {
      x: -1500,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onRefresh: (self) => scrollTriggersRef.current.push(self)
      }
    });

    const tl2 = gsap.to(row2, {
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5,
        invalidateOnRefresh: true,
        refreshPriority: -1,
        onRefresh: (self) => scrollTriggersRef.current.push(self)
      }
    });

    // حفظ المراجع
    if (tl1.scrollTrigger) scrollTriggersRef.current.push(tl1.scrollTrigger);
    if (tl2.scrollTrigger) scrollTriggersRef.current.push(tl2.scrollTrigger);

    return () => {
      // إيقاف الأنيميشنز أولاً
      tl1.kill();
      tl2.kill();
      
      // إيقاف ScrollTriggers المحفوظة
      scrollTriggersRef.current.forEach(trigger => {
        if (trigger && trigger.kill) {
          trigger.kill(true);
        }
      });
      scrollTriggersRef.current = [];
      
      // تنظيف willChange
      [row1, row2].forEach(row => {
        if (row) {
          row.style.willChange = 'auto';
          // إعادة تعيين transform
          gsap.set(row, { clearProps: 'all' });
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <AnimatedTitle text="Our Creative Services" className={styles.mainTitle} />
        
        <div className={styles.sliderContainer}>
          <div ref={row1Ref} className={styles.row}>
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.id}-${index}`} className={styles.card}>
                <img src={brand.image} alt={`Brand ${brand.id}`} className={styles.brandImage} />
              </div>
            ))}
          </div>
          
          <div ref={row2Ref} className={styles.row}>
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <div key={`${brand.id}-${index}`} className={styles.card}>
                <img src={brand.image} alt={`Brand ${brand.id}`} className={styles.brandImage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}