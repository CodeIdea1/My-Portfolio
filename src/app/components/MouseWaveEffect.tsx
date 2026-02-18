'use client';

import { useEffect, useRef } from 'react';

interface MouseWaveEffectProps {
  imageSrc: string;
}

export default function MouseWaveEffect({ imageSrc }: MouseWaveEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = imageSrc;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', resize);

    let time = 0;
    const animate = () => {
      if (!img.complete) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      time += 0.05;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x, y } = mouseRef.current;
      const waveRadius = 250;

      for (let py = 0; py < canvas.height; py += 3) {
        for (let px = 0; px < canvas.width; px += 3) {
          const dx = px - x;
          const dy = py - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < waveRadius) {
            const intensity = 1 - distance / waveRadius;
            const wave = Math.sin(distance * 0.08 - time * 2) * 12 * intensity;
            const angle = Math.atan2(dy, dx);
            const offsetX = Math.cos(angle) * wave;
            const offsetY = Math.sin(angle) * wave;

            const sx = (px / canvas.width) * img.width;
            const sy = (py / canvas.height) * img.height;
            const sw = (3 / canvas.width) * img.width;
            const sh = (3 / canvas.height) * img.height;

            ctx.drawImage(img, sx, sy, sw, sh, px + offsetX, py + offsetY, 3, 3);
          }
        }
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    img.onload = () => animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [imageSrc]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 10,
        pointerEvents: 'none',
        opacity: 0.8
      }}
    />
  );
}
