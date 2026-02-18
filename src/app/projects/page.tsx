'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import styles from '../styles/ProjectsPage.module.css';
import LettersAnimation from '../components/LettersAnimation';
import { title } from 'process';

gsap.registerPlugin(ScrollTrigger);
const projects = [
  {
    id: 1,
    title: "Stylish Accessories",
    description: "Modern high-conversion e-commerce design.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395075/featuredprojects-stylish-accessories_ksdpld.png",
    link: "https://stylish-accessories-3b34d.web.app/"
  },
  {
    id: 2,
    title: "Flower Hub",
    description: "Clean and elegant product showcase.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395103/flowers_ic7sjn.png",
    link: "https://flower-hub.vercel.app/"
  },
  {
    id: 3,
    title: "Huracan",
    description: "Luxury sports car landing page.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395077/landing-design2-car_g6j8zx.webp",
    link: "https://lamborghini-huracan-555ef.web.app/"
  },
  {
    id: 4,
    title: "Dose Gym",
    description: "Fitness app with intuitive UI.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395120/projects-dose1_ghbnc5.png",
    link: "https://dose-gym-9c4c9.web.app/"
  },
  {
    id: 5,
    title: "Hoodie",
    description: "Brand identity & e-commerce concept.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395092/hoodie_wgj1tc.png",
    link: "https://hoodie-theta.vercel.app/"
  },
  {
    id: 6,
    title: "Delta",
    description: "Premium luxury brand website.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395112/delta_cuq5gt.png",
    link: "https://delta-two-xi.vercel.app/"
  },
{
  id: 7,
  title: "Dana Socks",
  description: "Full e-commerce store experience.",
  image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395076/danaSocks_lpukre.png",
  link: "https://dana-socks.vercel.app/"
},
  {
    id: 8,
    title: "Veyron",
    description: "Futuristic sports car concept.",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395124/p1_adwbvf.png",
    link: "https://veyron-kjrw.vercel.app/"
  }
];




export default function ProjectsPage() {
  const sectionRef = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const descriptionRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const [visibleDescriptions, setVisibleDescriptions] = useState<Set<number>>(new Set());
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth <= 768;
    
    imageRefs.current.forEach((img) => {
      if (img) {
        if (isMobile) {
          gsap.fromTo(img, 
            { y: '-28%' },
            {
              y: '10%',
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        } else {
          gsap.fromTo(img, 
            { x: '-50%' },
            {
              x: '30%',
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
              },
            }
          );
        }
      }
    });

    if (isMobile) {
      descriptionRefs.current.forEach((desc, index) => {
        if (desc) {
          ScrollTrigger.create({
            trigger: desc,
            start: 'top 80%',
            onEnter: () => {
              setVisibleDescriptions(prev => new Set(prev).add(index));
            },
          });
        }
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projectsLetters = [
    { char: 'P', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392938/p_tn5uhw.svg' },
    { char: 'R', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392938/r_atws26.svg' },
    { char: 'O', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396240/o2_jhhg6j.svg' },
    { char: 'J', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392936/j_obxyy8.svg' },
    { char: 'E', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771394790/e_phumbu.png' },
    { char: 'C', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392935/cSmall_a2jvst.svg' },
    { char: 'T', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771396134/t2_wx76wn.svg' },
    { char: 'S', src: 'https://res.cloudinary.com/dytwa5cro/image/upload/v1771392941/sSmall_z1y4ra.svg' }
  ];

  return (
    <div className={styles.page}>
      <LettersAnimation letters={projectsLetters} />
      <section ref={sectionRef} className={styles.projectsSection}>
        <Swiper
          modules={isMobile ? [] : [FreeMode, Mousewheel]}
          slidesPerView={isMobile ? 1 : "auto"}
          spaceBetween={20}
          freeMode={isMobile ? false : {
            enabled: true,
            momentum: true,
            momentumRatio: 0.5,
            momentumVelocityRatio: 0.5
          }}
          mousewheel={isMobile ? false : {
            forceToAxis: true,
            sensitivity: 1
          }}
          speed={600}
          grabCursor={!isMobile}
          allowTouchMove={!isMobile}
          className={styles.imageGrid}
        >
          {projects.map((project, index) => (
            <SwiperSlide key={project.id}>
              <div className={styles.projectCard}>
                <div className={styles.imageBox} onClick={() => window.open(project.link, '_blank')}>
                  <img 
                    ref={(el) => { imageRefs.current[index] = el; }} 
                    src={project.image} 
                    alt={`Project ${project.id}`} 
                  />
                  <div className={styles.hoverContent}>
                    <h3 className={styles.hoverTitle}>{project.title}</h3>
                    <p className={styles.hoverDescription}>{project.description}</p>
                  </div>
                  <div className={styles.mobileContent}>
                    <h3 className={styles.mobileTitle}>{project.title}</h3>
                    <p 
                      ref={(el) => { descriptionRefs.current[index] = el; }}
                      className={`${styles.mobileDescription} ${visibleDescriptions.has(index) ? styles.visible : ''}`}
                    >
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
}
