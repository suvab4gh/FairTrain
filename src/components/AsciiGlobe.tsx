import React, { useEffect, useRef } from 'react';

export default function AsciiGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const particles: { x: number, y: number, z: number }[] = [];
    const numParticles = 400;
    const radius = Math.min(width, height) * 0.35;

    for (let i = 0; i < numParticles; i++) {
       const theta = Math.random() * 2 * Math.PI;
       const phi = Math.acos((Math.random() * 2) - 1);
       particles.push({
           x: Math.sin(phi) * Math.cos(theta),
           y: Math.sin(phi) * Math.sin(theta),
           z: Math.cos(phi)
       });
    }

    let angleX = 0;
    let angleY = 0;

    const render = () => {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, width, height);

      angleY += 0.003;
      angleX += 0.001;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected = particles.map(p => {
         const y1 = p.y * cosX - p.z * sinX;
         const z1 = p.y * sinX + p.z * cosX;
         const x2 = p.x * cosY + z1 * sinY;
         const z2 = -p.x * sinY + z1 * cosY;

         const scale = 200 / (200 + z2 * radius * 0.5);
         
         return {
            x: width/2 + x2 * radius * scale,
            y: height/2 + y1 * radius * scale,
            z: z2,
            scale
         };
      });

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.lineWidth = 1;
      
      for(let i=0; i<projected.length; i++) {
        for(let j=i+1; j<projected.length; j++) {
           const dx = projected[i].x - projected[j].x;
           const dy = projected[i].y - projected[j].y;
           const distSq = dx*dx + dy*dy;
           if (distSq < 2500) {
              ctx.beginPath();
              ctx.moveTo(projected[i].x, projected[i].y);
              ctx.lineTo(projected[j].x, projected[j].y);
              ctx.stroke();
           }
        }
      }

      ctx.font = '12px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const chars = ['.', '+', '*', ':'];

      projected.sort((a,b) => b.z - a.z).forEach((p, i) => {
         const alpha = Math.max(0.1, 1 - (p.z + 1) / 2);
         ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
         const char = chars[i % chars.length];
         ctx.fillText(char, p.x, p.y);
      });

      requestAnimationFrame(render);
    };

    const animId = requestAnimationFrame(render);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <canvas 
       ref={canvasRef} 
       style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }} 
    />
  );
}
