'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // استخدام View Transitions API للمواقع الاحترافية
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
      });
    } else {
      // Fallback للمتصفحات القديمة
      document.documentElement.classList.add('theme-transitioning');
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
      
      setTimeout(() => {
        document.documentElement.classList.remove('theme-transitioning');
      }, 1200);
    }
    
    setTimeout(() => setIsAnimating(false), 1200);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // منع التمرير عند فتح المنيو
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '/', label: 'Home' },
    { href: '/OurStory', label: 'Our Story' },
    { href: '/projects', label: 'Projects' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {/* شريط التنقل */}
      <nav className={styles.navbar}>
        <div className={styles.navContent}>
          <div className={styles.logo}>
            <Link href="/">
              <Image src="https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/logo_ggcovs.png" alt="C" width={33} height={33} className={styles.logoImage} />
              ODEIDEA
            </Link>
          </div>
          
          <div className={styles.navButtons}>
            <div className={styles.toggleSwitch} onClick={toggleTheme}>
              <input 
                type="checkbox" 
                checked={theme === 'light'} 
                onChange={toggleTheme}
                disabled={isAnimating}
              />
              <span className={styles.slider}>
                <Image 
                  src="/images/backgrounds/nightMode.png" 
                  alt="Night Mode" 
                  width={72} 
                  height={72}
                  className={styles.moonIcon}
                />
                <Image 
                  src="/images/backgrounds/dayMode.png" 
                  alt="Day Mode" 
                  width={72} 
                  height={72}
                  className={styles.sunIcon}
                />
              </span>
            </div>
            
            <button 
              className={`${styles.menuButton} ${isOpen ? styles.open : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <div className={styles.hamburger}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* المنيو المنسدل */}
      <div className={`${styles.menuOverlay} ${isOpen ? styles.open : ''}`}>
        <div className={styles.menuContent}>
          <ul className={styles.menuList}>
            {menuItems.map((item, index) => (
              <li 
                key={item.href} 
                className={styles.menuItem}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Link 
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={styles.menuLink}
                >
                  <div className={styles.textWrapper}>
                    <p>{item.label}</p>
                    <p>{item.label}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}