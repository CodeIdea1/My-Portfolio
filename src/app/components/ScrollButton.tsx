'use client';

import { IoChevronDown } from 'react-icons/io5';
import styles from '../styles/ScrollButton.module.css';

interface ScrollButtonProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function ScrollButton({ targetRef }: ScrollButtonProps) {
  const handleClick = () => {
    const scrollAmount = window.innerHeight * 0.8;
    
    window.scrollBy({
      top: scrollAmount,
      behavior: 'smooth'
    });
  };

  return (
    <button className={styles.scrollButton} onClick={handleClick}>
      <span className={styles.text}>Scroll to Explore</span>
      <IoChevronDown className={styles.arrow} size={20} />
    </button>
  );
}