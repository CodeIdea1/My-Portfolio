'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface SmokeDisplacementProps {
  imageSrc: string;
  children: React.ReactNode;
}

export default function SmokeDisplacement({ imageSrc, children }: SmokeDisplacementProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      uniform sampler2D uTexture;
      uniform vec2 uMouse;
      uniform float uTime;
      varying vec2 vUv;

      float noise(vec2 p) {
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
      }

      void main() {
        vec2 uv = vUv;
        vec2 mouse = uMouse;
        
        float dist = distance(uv, mouse);
        float effect = smoothstep(0.3, 0.0, dist);
        
        vec2 displacement = vec2(
          noise(uv * 10.0 + uTime * 0.5) - 0.5,
          noise(uv * 10.0 + uTime * 0.3) - 0.5
        ) * effect * 0.1;
        
        vec2 distortedUv = uv + displacement;
        vec4 color = texture2D(uTexture, distortedUv);
        
        float alpha = 1.0 - effect * 0.7;
        color.a *= alpha;
        
        gl_FragColor = color;
      }
    `;

    const loader = new THREE.TextureLoader();
    loader.load(imageSrc, (texture) => {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uTime: { value: 0 }
        },
        vertexShader,
        fragmentShader,
        transparent: true
      });

      const geometry = new THREE.PlaneGeometry(2, 2);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);

      const handleMouseMove = (e: MouseEvent) => {
        const rect = containerRef.current!.getBoundingClientRect();
        mouseRef.current.x = (e.clientX - rect.left) / rect.width;
        mouseRef.current.y = 1 - (e.clientY - rect.top) / rect.height;
        material.uniforms.uMouse.value.set(mouseRef.current.x, mouseRef.current.y);
      };

      containerRef.current!.addEventListener('mousemove', handleMouseMove);

      const animate = () => {
        material.uniforms.uTime.value += 0.01;
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };
      animate();

      return () => {
        containerRef.current?.removeEventListener('mousemove', handleMouseMove);
      };
    });

    return () => {
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, [imageSrc]);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', borderRadius: '30px', overflow: 'hidden' }}>
      <div ref={containerRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
      <div style={{ position: 'relative', zIndex: 10 }}>
        {children}
      </div>
    </div>
  );
}