'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { gsap } from 'gsap';
import styles from '../styles/LettersAnimation.module.css';

interface Letter {
  char: string;
  src: string;
}

interface LettersAnimationProps {
  letters: Letter[];
  navigateTo?: string;
  alignItems?: 'center' | 'end';
}

export default function LettersAnimation({ letters, navigateTo, alignItems = 'center' }: LettersAnimationProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const lettersRef = useRef<(HTMLImageElement | null)[]>([]);
  const router = useRouter();

  useEffect(() => {
    const setInitialState = () => {
      lettersRef.current.forEach((letter) => {
        if (letter) {
          gsap.set(letter, { scaleY: 0, transformOrigin: 'bottom' });
        }
      });
    };

    setInitialState();

    const timer = setTimeout(() => {
      const delays = [0, 0.03, 0.06, 0.09, 0.12, 0.15, 0.18];
      
      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          gsap.to(letter, {
            scaleY: 1,
            duration: 0.5,
            delay: delays[index],
            ease: 'power2.out'
          });
        }
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!navigateTo) return;
    
    e.preventDefault();
    setIsAnimating(true);
    
    lettersRef.current.forEach((letter, index) => {
      if (letter) {
        gsap.to(letter, {
          scaleY: 0,
          duration: 0.3,
          delay: index * 0.03,
          ease: 'power2.in'
        });
      }
    });
    
    setTimeout(() => {
      router.push(navigateTo);
    }, 600);
  };

  return (
    <section className={`${styles.section} ${alignItems === 'end' ? styles.alignEnd : ''}`}>
      <div className={styles.container}>
        <div 
          className={styles.lettersLink} 
          onClick={handleClick}
          style={{ cursor: navigateTo ? 'pointer' : 'default' }}
        >
          <div className={styles.lettersContainer}>
            {letters.map((letter, index) => (
              <Image
                key={`${letter.char}-${index}`}
                ref={(el) => { lettersRef.current[index] = el; }}
                src={letter.src}
                alt={letter.char}
                width={120}
                height={120}
                className={styles.letterImage}
                priority
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
