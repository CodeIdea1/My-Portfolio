'use client';

import HeroSection from "./sections/HeroSectionHome";
import OurShortStory from "./sections/OurShortStory";
import ScrollSlider from "./sections/ScrollSlider";
import StackedCards from './sections/StackedCards';
import StorySection from './sections/StorySection';
import SectionHeader from './components/SectionHeader';
import { useScrollToTop } from './hooks/useScrollToTop';
import LettersAnimation from './components/LettersAnimation';

import { useRef, useEffect } from 'react';

const aboutLetters = [
  { char: 'A', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392937/Ocapital_rqhucc.svg' },
  { char: 'B', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392942/u_x5bcnv.svg' },
  { char: 'O', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392938/r_atws26.svg' },
  { char: 'U', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392940/Scapital_vslrzx.svg' },
  { char: 'T', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396134/t2_wx76wn.svg' },
  { char: 'O', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392940/oo_vmrqir.svg' },
  { char: 'D', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392938/r_atws26.svg' },
  { char: 'I', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392945/y_kz9atg.svg' }
];

export default function Home() {
  const stackedCardsRef = useRef<HTMLDivElement>(null);
  useScrollToTop();
  
  useEffect(() => {
    if (performance.navigation.type === 2) {
      const scrollToStacked = sessionStorage.getItem('scrollToStacked');
      if (scrollToStacked === 'true') {
        sessionStorage.removeItem('scrollToStacked');
        setTimeout(() => {
          stackedCardsRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' });
        }, 100);
      } else {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted && sessionStorage.getItem('cardClicked') === 'true') {
        sessionStorage.removeItem('cardClicked');
        sessionStorage.setItem('scrollToStacked', 'true');
        document.documentElement.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        setTimeout(() => window.location.reload(), 0);
      }
    };

    if (sessionStorage.getItem('cardClicked') === 'true') {
      document.documentElement.style.scrollBehavior = 'auto';
      window.history.scrollRestoration = 'manual';
    }

    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);
  
  return (
    <>
      <HeroSection />
      <SectionHeader targetRef={stackedCardsRef} />
      <StackedCards ref={stackedCardsRef} />    
      <ScrollSlider />
      <LettersAnimation letters={aboutLetters} navigateTo="/OurStory" />
    </>
  );
}
