'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/VideoFlip.module.css';

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { id: 1, src: 'https://framerusercontent.com/assets/egimocChXD3ertWKdxQWzGuFK94.mp4' },
  { id: 2, src: 'https://framerusercontent.com/assets/Iu5fLPXyAZnTvaGeAlTAAWo70U.mp4' },
  { id: 3, src: 'https://framerusercontent.com/assets/0t6ib0zRbLnxvRjM9NWNypsfktk.mp4' }
];

const backgroundTexts = [
  'INNOVATION • CREATIVITY • TECHNOLOGY • DESIGN • ',
  'DEVELOPMENT • SOLUTIONS • DIGITAL • FUTURE • ',
  'EXPERIENCE • INTERFACE • MODERN • DYNAMIC • ',
  'EXCELLENCE • QUALITY • PERFORMANCE • SUCCESS • '
];

export default function VideoFlip() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;

    if (!section || !card) return;

    let currentVideo = 0;

    const showVideo = (index: number) => {
      videoRefs.current.forEach((video, i) => {
        if (video) {
          if (i === index) {
            video.style.opacity = '1';
            video.play().catch(() => {});
          } else {
            video.style.opacity = '0';
            video.pause();
          }
        }
      });
    };

    const animateTexts = (progress: number) => {
      textRefs.current.forEach((text, i) => {
        if (text) {
          let translateY = 0;
          
          if (progress < 0.20) {
            translateY = i === 0 ? 0 : 130 * (i + 1);
          } else if (progress < 0.25) {
            const localProgress = (progress - 0.20) / 0.05;
            if (i === 0) {
              translateY = -130 * localProgress;
            } else if (i === 1) {
              translateY = 130 - (130 * localProgress);
            } else {
              translateY = 130 * (i + 1);
            }
          } else if (progress < 0.45) {
            translateY = i === 0 ? -130 : i === 1 ? 0 : 130 * i;
          } else if (progress < 0.55) {
            const localProgress = (progress - 0.45) / 0.10;
            if (i === 0) {
              translateY = -130 - (130 * localProgress);
            } else if (i === 1) {
              translateY = -130 * localProgress;
            } else if (i === 2) {
              translateY = 130 - (130 * localProgress);
            } else {
              translateY = 390;
            }
          } else {
            translateY = i <= 1 ? -130 * (i + 2) : i === 2 ? 0 : 130;
          }
          
          text.style.setProperty('--translate-y', `${translateY}px`);
        }
      });
    };

    // ✅ استخدام Context API
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=350%',
          scrub: 0.3,
          pin: true,
          pinSpacing: true,
          onUpdate: (self) => {
            const progress = self.progress;
            
            let targetVideo = 0;
            if (progress < 0.20) {
              targetVideo = 0;
            } else if (progress < 0.40) {
              targetVideo = 1;
            } else if (progress < 0.45) {
              targetVideo = 1;
            } else if (progress < 0.55) {
              targetVideo = 2;
            } else {
              targetVideo = 2;
            }
            
            if (targetVideo !== currentVideo) {
              currentVideo = targetVideo;
              showVideo(currentVideo);
            }

            animateTexts(progress);
          }
        }
      });

      tl.to(card, { rotateX: 0, duration: 0.15 })
        .to(card, { rotateX: 360, ease: "power2.inOut", duration: 0.1 })
        .to(card, { rotateX: 360, duration: 0.2 })
        .to(card, { rotateX: 720, ease: "power2.inOut", duration: 0.1 })
        .to(card, { rotateX: 720, duration: 0.45 });
    }, section);

    showVideo(0);
    animateTexts(0);
    
    setTimeout(() => {
      if (videoRefs.current[0]) {
        videoRefs.current[0].play().catch(() => {});
      }
    }, 100);

    return () => {
      ctx.revert(); // ✅ يحذف كل حاجة تلقائياً
      
      videoRefs.current.forEach(video => {
        if (video) {
          video.pause();
          video.src = '';
        }
      });
      
      textRefs.current.forEach(text => {
        if (text) {
          text.style.removeProperty('--translate-y');
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.backgroundTextContainer}>
        {backgroundTexts.map((text, index) => (
          <div
            key={index}
            ref={(el) => { textRefs.current[index] = el; }}
            className={styles.backgroundText}
          >
            {text.repeat(20)}
          </div>
        ))}
      </div>
      <div className={styles.container}>
        <div ref={cardRef} className={styles.videoCard}>
          {videos.map((video, index) => (
            <video
              key={video.id}
              ref={(el) => { videoRefs.current[index] = el; }}
              src={video.src}
              className={`${styles.video}`}
              autoPlay
              muted
              loop
              playsInline
            />
          ))}
        </div>
      </div>
    </section>
  );
}