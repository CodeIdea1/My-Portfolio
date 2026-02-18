'use client';

import { useEffect, useState } from 'react';
import ContactSection from '../sections/ContactSection';
import LettersAnimation from '../components/LettersAnimation';
import { useScrollToTop } from '../hooks/useScrollToTop';

const contactLetters = [
  { char: 'C', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392935/C_vjtclm.svg' },
  { char: 'O', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396240/o2_jhhg6j.svg' },
  { char: 'N', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396879/n2_k7yyoa.svg' },
  { char: 'T', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396134/t2_wx76wn.svg' },
  { char: 'A', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392936/A_ewf0ht.svg' },
  { char: 'C', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392935/cSmall_a2jvst.svg' },
  { char: 'T', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396134/t2_wx76wn.svg' }
];

export default function ContactPage() {
  const [showContact, setShowContact] = useState(false);
  useScrollToTop();

  useEffect(() => {
    const timer = setTimeout(() => setShowContact(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LettersAnimation letters={contactLetters} />
      {showContact && <ContactSection />}
    </>
  );
}