'use client';

import { useEffect, useRef } from 'react';
import styles from '../styles/SmokeEffect.module.css';

interface SmokeEffectProps {
  imageSrc: string;
  children: React.ReactNode;
}

export default function SmokeEffect({ imageSrc, children }: SmokeEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const particles = useRef<Array<{ x: number; y: number; size: number; opacity: number; vx: number; vy: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };
    resizeCanvas();

    const img = new Image();
    img.onload = () => {
      const handleMouseMove = (e: MouseEvent) => {
        const rect = container.getBoundingClientRect();
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;

        // إنشاء جسيمات من الصورة نفسها
        for (let i = 0; i < 5; i++) {
          particles.current.push({
            x: mouseRef.current.x + (Math.random() - 0.5) * 30,
            y: mouseRef.current.y + (Math.random() - 0.5) * 30,
            size: Math.random() * 20 + 5,
            opacity: 1,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * -2 - 1
          });
        }
      };

      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // رسم الصورة الأساسية
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // إنشاء قناع للتلاشي
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // تطبيق تأثير التلاشي حول الماوس
        for (let i = 0; i < data.length; i += 4) {
          const x = (i / 4) % canvas.width;
          const y = Math.floor((i / 4) / canvas.width);
          const distance = Math.sqrt(
            Math.pow(x - mouseRef.current.x, 2) + 
            Math.pow(y - mouseRef.current.y, 2)
          );
          
          if (distance < 80) {
            const alpha = distance / 80;
            data[i + 3] *= alpha; // تقليل الشفافية
          }
        }
        
        ctx.putImageData(imageData, 0, 0);
        
        // رسم جسيمات الصورة المتطايرة
        particles.current.forEach((particle, index) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.opacity -= 0.02;
          particle.size *= 0.98;
          
          if (particle.opacity <= 0) {
            particles.current.splice(index, 1);
            return;
          }
          
          // رسم قطعة من الصورة كجسيم
          ctx.save();
          ctx.globalAlpha = particle.opacity;
          ctx.drawImage(
            img,
            mouseRef.current.x - particle.size/2, mouseRef.current.y - particle.size/2,
            particle.size, particle.size,
            particle.x - particle.size/2, particle.y - particle.size/2,
            particle.size, particle.size
          );
          ctx.restore();
        });
        
        requestAnimationFrame(animate);
      };

      container.addEventListener('mousemove', handleMouseMove);
      animate();

      return () => {
        container.removeEventListener('mousemove', handleMouseMove);
      };
    };
    
    img.src = imageSrc;
    
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [imageSrc]);

  return (
    <div ref={containerRef} className={styles.container}>
      <canvas ref={canvasRef} className={styles.canvas} />
      <div className={styles.content}>
        {children}
      </div>
    </div>
  );
}