'use client';

import OurShortStory from '../sections/OurShortStory';
import StorySection from '../sections/StorySection';
import LettersAnimation from '../components/LettersAnimation';

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

const contactLetters = [
  { char: 'C', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392935/C_vjtclm.svg' },
  { char: 'O', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396240/o2_jhhg6j.svg' },
  { char: 'N', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396879/n2_k7yyoa.svg' },
  { char: 'T', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396134/t2_wx76wn.svg' },
  { char: 'A', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392936/A_ewf0ht.svg' },
  { char: 'C', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392935/cSmall_a2jvst.svg' },
  { char: 'T', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396134/t2_wx76wn.svg' }
];

export default function OurStory() {
  return (
    <main>
      <LettersAnimation letters={aboutLetters} alignItems="end" />
      <OurShortStory />
      <StorySection />
      <LettersAnimation letters={contactLetters} navigateTo="/contact" />
    </main>
  );
}