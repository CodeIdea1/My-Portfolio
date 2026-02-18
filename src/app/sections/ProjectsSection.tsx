'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "منصة تجارة إلكترونية متكاملة مع نظام دفع آمن",
    category: "Web Development",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395103/flowers_ic7sjn.png",
    year: "2024",
    link: "https://flower-hub.vercel.app/"
  },
  {
    id: 2,
    title: "Lamborghini Showcase",
    description: "موقع عرض تفاعلي لسيارات لامبورغيني الفاخرة",
    category: "Frontend Design",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/Gemini_Generated_Image_gvte00gvte00gvte_j5qtce.png",
    year: "2022",
    link: "https://lamborghini-huracan-555ef.web.app/"
  },
  {
    id: 3,
    title: "Delta Portfolio",
    description: "موقع بورتفوليو احترافي بتصميم عصري وأنيق",
    category: "UI/UX Design",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395075/featuredprojects-stylish-accessories_ksdpld.png",
    year: "2023",
    link: "https://delta-two-xi.vercel.app/"
  },
  {
    id: 4,
    title: "Mobile App",
    description: "تطبيق موبايل متعدد المنصات بواجهة سلسة",
    category: "React Native",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395092/hoodie_wgj1tc.png",
    year: "2024",
    link: "#"
  },
  {
    id: 5,
    title: "Dashboard Design",
    description: "لوحة تحكم تحليلية مع رسوم بيانية تفاعلية",
    category: "Web App",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771395112/delta_cuq5gt.png",
    year: "2023",
    link: "#"
  },
  {
    id: 6,
    title: "Brand Identity",
    description: "هوية بصرية متكاملة لعلامة تجارية مميزة",
    category: "Branding",
    image: "https://res.cloudinary.com/dytwa5cro/image/upload/v1771394791/Gemini_Generated_Image_gvte00gvte00gvte_j5qtce.png",
    year: "2024",
    link: "#"
  }
];

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const projectElements = projectsRef.current.filter(Boolean);
    if (projectElements.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.set(projectElements, {
        opacity: 0,
        y: 150
      });

      projectElements.forEach((project, index) => {
        gsap.to(project, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: project,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
            toggleActions: 'play none none reverse'
          }
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>مشاريعي</h2>
          <p className={styles.subtitle}>مجموعة من أعمالي المميزة</p>
        </div>

        <div className={styles.grid}>
          {projects.map((project, index) => (
            <div
              key={project.id}
              ref={(el) => { projectsRef.current[index] = el; }}
              className={styles.projectCard}
              onClick={() => window.open(project.link, '_blank')}
            >
              <div 
                className={styles.projectImage}
                style={{ backgroundImage: `url(${project.image})` }}
              >
                <div className={styles.overlay} />
              </div>
              <div className={styles.projectInfo}>
                <div className={styles.projectMeta}>
                  <span className={styles.category}>{project.category}</span>
                  <span className={styles.year}>{project.year}</span>
                </div>
                <h3 className={styles.projectTitle}>{project.title}</h3>
              </div>
              <div className={styles.hoverContent}>
                <h3 className={styles.hoverTitle}>{project.title}</h3>
                <p className={styles.hoverDescription}>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
