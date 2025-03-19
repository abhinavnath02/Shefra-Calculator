import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

interface ScrollingBackgroundProps {
  iconPath: string;
  speed?: number;
  opacity?: number;
}

export const ScrollingBackground = ({
  iconPath,
  speed = 20,
  opacity = 0.1,
}: ScrollingBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Load and draw the icon
    const img = new Image();
    img.src = iconPath;

    img.onload = () => {
      const draw = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Set opacity based on theme
        ctx.globalAlpha = opacity;
        
        // Draw the icon in a grid pattern
        const iconSize = 100; // Adjust this value based on your icon size
        const spacing = iconSize * 1.5;
        
        for (let x = 0; x < canvas.width; x += spacing) {
          for (let y = 0; y < canvas.height; y += spacing) {
            ctx.drawImage(img, x, y, iconSize, iconSize);
          }
        }

        // Animate the background
        ctx.translate(1, 0);
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        animationRef.current = requestAnimationFrame(draw);
      };

      draw();
    };

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [iconPath, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{
        opacity: theme === 'dark' ? opacity * 0.7 : opacity,
      }}
    />
  );
}; 