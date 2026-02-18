'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../styles/ParticlesBackground.module.css';

gsap.registerPlugin(ScrollTrigger);

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    opacity: number;
    baseOpacity: number;
    scale: number;
    initialX: number;
    initialY: number;
    targetX: number;
    targetY: number;
    corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  }>>([]);
  const scrollProgressRef = useRef(0);
  const particleColorRef = useRef('255, 255, 255');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // تحديث اللون بناءً على الثيم
    const updateParticleColor = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      particleColorRef.current = theme === 'light' ? '80, 80, 80' : '200, 200, 200';
    };

    updateParticleColor();

    // مراقبة تغيير الثيم
    const observer = new MutationObserver(updateParticleColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Array<{
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      baseOpacity: number;
      scale: number;
      initialX: number;
      initialY: number;
      targetX: number;
      targetY: number;
      corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    }> = [];

    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      const baseOpacity = Math.random() * 0.4 + 0.6;
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      
      // تحديد أقرب ركن لكل نقطة
      let corner: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
      if (x < canvas.width / 2 && y < canvas.height / 2) corner = 'topLeft';
      else if (x >= canvas.width / 2 && y < canvas.height / 2) corner = 'topRight';
      else if (x < canvas.width / 2 && y >= canvas.height / 2) corner = 'bottomLeft';
      else corner = 'bottomRight';
      
      // إنشاء موقع عشوائي جديد للانتقال إليه
      const targetX = Math.random() * canvas.width;
      const targetY = Math.random() * canvas.height;
      
      particles.push({
        x,
        y,
        initialX: x,
        initialY: y,
        targetX,
        targetY,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: baseOpacity,
        baseOpacity: baseOpacity,
        scale: 1,
        corner
      });
    }

    particlesRef.current = particles;

    function animate() {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        // الحركة الأساسية فقط عندما لا يوجد سكرول
        if (scrollProgressRef.current === 0) {
          particle.initialX += particle.speedX;
          particle.initialY += particle.speedY;

          if (particle.initialX < 0 || particle.initialX > canvas.width) particle.speedX *= -1;
          if (particle.initialY < 0 || particle.initialY > canvas.height) particle.speedY *= -1;
          
          particle.x = particle.initialX;
          particle.y = particle.initialY;
        }

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * particle.scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${particleColorRef.current}, ${particle.opacity})`;
        ctx.fill();
      });

      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${particleColorRef.current}, ${0.15 * (1 - distance / 120) * particle.opacity})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    // GSAP ScrollTrigger للنقاط
    gsap.to(particlesRef.current, {
      opacity: 0,
      scale: 0.3,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: canvas,
        start: 'top top',
        end: 'bottom top',
        scrub: 1.2,
        onUpdate: (self) => {
          const progress = self.progress;
          scrollProgressRef.current = progress;
          
          particlesRef.current.forEach((particle) => {
            // تلاشي وتصغير
            particle.opacity = particle.baseOpacity * (1 - progress);
            particle.scale = 1 - (progress * 0.7);
            
            // المرحلة الأولى (0-0.4): تبديل الأماكن بحركة سلسة
            if (progress <= 0.4) {
              const shuffleProgress = progress / 0.4;
              const easeProgress = 1 - Math.pow(1 - shuffleProgress, 3); // ease-out cubic
              
              particle.x = particle.initialX + (particle.targetX - particle.initialX) * easeProgress;
              particle.y = particle.initialY + (particle.targetY - particle.initialY) * easeProgress;
            }
            // المرحلة الثانية (0.4-1): الابتعاد نحو الأركان
            else {
              const disperseProgress = (progress - 0.4) / 0.6;
              const easeProgress = Math.pow(disperseProgress, 2); // ease-in quad
              
              const moveDistance = easeProgress * 1200;
              
              switch(particle.corner) {
                case 'topLeft':
                  particle.x = particle.targetX - moveDistance;
                  particle.y = particle.targetY - moveDistance;
                  break;
                case 'topRight':
                  particle.x = particle.targetX + moveDistance;
                  particle.y = particle.targetY - moveDistance;
                  break;
                case 'bottomLeft':
                  particle.x = particle.targetX - moveDistance;
                  particle.y = particle.targetY + moveDistance;
                  break;
                case 'bottomRight':
                  particle.x = particle.targetX + moveDistance;
                  particle.y = particle.targetY + moveDistance;
                  break;
              }
            }
          });
        }
      }
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.particlesCanvas} />;
}
