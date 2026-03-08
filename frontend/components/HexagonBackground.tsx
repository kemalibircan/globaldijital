'use client';

import { useEffect, useRef, memo } from 'react';

const HexagonBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hexagonsRef = useRef<Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
    targetOpacity: number;
  }>>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Set canvas size
    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initHexagons();
    };

    // Initialize hexagons grid
    const initHexagons = () => {
      hexagonsRef.current = [];
      const hexSize = 40;
      const hexHeight = hexSize * Math.sqrt(3);
      const hexWidth = hexSize * 2;
      const horizontalSpacing = hexWidth * 0.75;
      const verticalSpacing = hexHeight;

      for (let row = 0; row < Math.ceil(window.innerHeight / verticalSpacing) + 1; row++) {
        for (let col = 0; col < Math.ceil(window.innerWidth / horizontalSpacing) + 1; col++) {
          const x = col * horizontalSpacing;
          const y = row * verticalSpacing + (col % 2 === 1 ? verticalSpacing / 2 : 0);
          
          hexagonsRef.current.push({
            x,
            y,
            size: hexSize,
            opacity: 0,
            targetOpacity: 0,
          });
        }
      }
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Draw hexagon
    const drawHexagon = (x: number, y: number, size: number, opacity: number) => {
      if (opacity <= 0) return;
      
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) {
          ctx.moveTo(hx, hy);
        } else {
          ctx.lineTo(hx, hy);
        }
      }
      ctx.closePath();
      
      // Get theme from document
      const isDark = document.documentElement.classList.contains('dark');
      
      ctx.strokeStyle = isDark 
        ? `rgba(37, 99, 235, ${opacity})` 
        : `rgba(37, 99, 235, ${opacity * 0.6})`;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Fill with gradient
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
      gradient.addColorStop(0, isDark 
        ? `rgba(37, 99, 235, ${opacity * 0.15})` 
        : `rgba(37, 99, 235, ${opacity * 0.08})`);
      gradient.addColorStop(1, 'rgba(37, 99, 235, 0)');
      ctx.fillStyle = gradient;
      ctx.fill();
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      hexagonsRef.current.forEach((hex) => {
        // Calculate distance from mouse
        const dx = hex.x - mousePos.current.x;
        const dy = hex.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Set target opacity based on distance
        if (distance < 150) {
          hex.targetOpacity = 1 - (distance / 150);
        } else {
          hex.targetOpacity = 0;
        }
        
        // Smooth opacity transition
        hex.opacity += (hex.targetOpacity - hex.opacity) * 0.1;
        
        // Draw if visible
        if (hex.opacity > 0.01) {
          drawHexagon(hex.x, hex.y, hex.size, hex.opacity);
        }
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
});

HexagonBackground.displayName = 'HexagonBackground';

export default HexagonBackground;

