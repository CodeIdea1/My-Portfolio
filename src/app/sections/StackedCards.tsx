'use client';

import { useLayoutEffect, useRef, forwardRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/StackedCards.module.css';
import { usePageTransition } from '../hooks/usePageTransition';
import PageTransition from '../components/PageTransition';

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    title: "Web Development",
    backgroundImage: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/Gemini_Generated_Image_gvte00gvte00gvte_j5qtce.png",
    link: "https://lamborghini-huracan-555ef.web.app/",
    year: "2022",
    services: "Landing Page Development"
  },
  {
    id: 2,
    title: "Web Development",
    backgroundImage: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395112/delta_cuq5gt.png",
    link: "https://delta-two-xi.vercel.app/",
    year: "2023",
    services: "Frontend, Backend, API"
  },
  {
    id: 3,
    title: "E-Commerce",
    backgroundImage: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395124/p1_adwbvf.png",
    link: "https://charge-x-iota.vercel.app/",
    year: "2026",
    services: "Web Development, UI Design"
  }
];

const StackedCards = forwardRef<HTMLDivElement>((props, ref) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const ctxRef = useRef<gsap.Context | null>(null);
  
  const { isTransitioning, transitionCard, navigateWithTransition, completeTransition } = usePageTransition();

  useLayoutEffect(() => {
    const section = (ref as React.RefObject<HTMLDivElement>)?.current || sectionRef.current;
    if (!section) return;

    const cardElements = cardsRef.current.filter(Boolean);
    if (cardElements.length === 0) return;
    
    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth <= 768;
      
      cardElements.forEach((card, index) => {
        if (!card) return;
        
        gsap.set(card, {
          y: index === 0 ? 0 : '120%',
          scale: 1,
          filter: 'blur(0px)',
          zIndex: index + 1,
          force3D: true
        });
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isMobile ? '+=1200%' : '+=200%',
          scrub: 0.5,
          pin: true,
          pinSpacing: true,
          anticipatePin: isMobile ? 0 : 1,
          invalidateOnRefresh: true,
          fastScrollEnd: isMobile ? true : false
        }
      })
      .to(cardElements[1], {
        y: 0,
        duration: isMobile ? 3 : 0.8,
        ease: 'power2.out',
        force3D: true
      }, isMobile ? 5 : 0)
      .to(cardElements[0], {
        scale: 0.75,
        filter: 'blur(15px)',
        duration: isMobile ? 3 : 0.8,
        ease: 'power2.out',
        force3D: true
      }, isMobile ? 5 : 0)
      .to(cardElements[2], {
        y: 0,
        duration: isMobile ? 3 : 0.8,
        ease: 'power2.out',
        force3D: true
      }, isMobile ? 10 : 0.8)
      .to(cardElements[1], {
        scale: 0.75,
        filter: 'blur(15px)',
        duration: isMobile ? 3 : 0.8,
        ease: 'power2.out',
        force3D: true
      }, isMobile ? 10 : 0.8)
      .to({}, { duration: isMobile ? 3 : 0 }, isMobile ? 13 : 1.6);
    }, section);

    ctxRef.current = ctx;

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === section) trigger.kill(true);
      });
    };
  }, []);

  return (
    <>
      <section ref={ref || sectionRef} className={styles.section}>
        <div className={styles.container}>
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => { cardsRef.current[index] = el; }}
              className={styles.card}
              style={{ 
                backgroundImage: `url(${card.backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
              onClick={(e) => {
                const cardElement = e.currentTarget as HTMLElement;
                navigateWithTransition(card.link, cardElement);
              }}
            >
              <div className={styles.cardContent}>
                <div className={styles.cardLabels}>
                  <span className={styles.cardYear}>{card.year}</span>
                  <span className={styles.cardServices}>{card.services}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <PageTransition 
        isActive={isTransitioning}
        cardElement={transitionCard}
        onComplete={completeTransition}
      />
    </>
  );
});

export default StackedCards;