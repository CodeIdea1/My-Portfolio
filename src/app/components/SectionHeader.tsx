'use client';

import ScrollButton from './ScrollButton';
import styles from '../styles/SectionHeader.module.css';

interface SectionHeaderProps {
  targetRef: React.RefObject<HTMLDivElement | null>;
}

export default function SectionHeader({ targetRef }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <ScrollButton targetRef={targetRef} />
      <p className={styles.description}>
        Explore our creative portfolio showcasing innovative solutions
      </p>
      <div className={styles.featuredText}>Featured Projects</div>
    </div>
  );
}