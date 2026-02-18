'use client';
import { motion } from 'framer-motion';
import styles from '../styles/mainTitles.module.css';

interface MainTitlesProps {
  text: string;
  fontSize?: string;
}

export default function MainTitles({ text, fontSize }: MainTitlesProps) {
  return (
    <h1 className={styles.mainTitle} style={{ fontSize }}>
      {text.split('').map((char, index) => {
        if (index === 0 && char.toLowerCase() === 's') {
          return (
            <motion.img
              key={index}
              src="https://res.cloudinary.com/dytwa5cro/image/upload/v1771392940/Scapital_vslrzx.svg"
              alt="S"
              className={styles.letterImage}
              whileHover={{ y: -35, scaleY: 1.25 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        }
        
        if (index === 5 && char.toLowerCase() === 'j') {
          return (
            <motion.img
              key={index}
              src="https://res.cloudinary.com/dytwa5cro/image/upload/v1771394790/g_ugcv3l.png"
              alt="J"
              className={styles.letterImage}
              whileHover={{ y: -35, scaleY: 1.25 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            />
          );
        }
        
        if (char !== ' ') {
          const charMap: { [key: string]: string } = {
            's': 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/s_y1k464.png',
            'a': 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394790/a_cl3n8s.png',
            'j': 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/j_jbd2pk.png',
            'm': 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/m_p4equn.png',
            'e': 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394790/e_phumbu.png',
            'l': 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/l_obimu1.png'
          };
          
          return (
            <img
              key={index}
              src={charMap[char.toLowerCase()] || ''}
              alt={char}
              className={styles.letterImage}
            />
          );
        }
        
        return <span key={index} className={styles.space}>&nbsp;</span>;
      })}
    </h1>
  );
}
