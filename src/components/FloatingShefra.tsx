import { useEffect, useRef } from 'react';

interface FloatingShefraProps {
  amount: number; // Keeping the prop for compatibility but not using it
}

const FloatingShefra = ({ amount }: FloatingShefraProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const offsetRef = useRef(0);
  const lastTimeRef = useRef(0);
  const fpsRef = useRef(60);
  const frameIntervalRef = useRef(1000 / 60); // Target 60fps

  useEffect(() => {
    if (!containerRef.current) return;

    const animate = (timestamp: number) => {
      if (!containerRef.current) return;
      
      // Calculate delta time for smooth animation
      const deltaTime = timestamp - lastTimeRef.current;
      
      // Only update if enough time has passed (targeting 60fps)
      if (deltaTime >= frameIntervalRef.current) {
        // Update offset for horizontal scrolling (60fps)
        offsetRef.current = (offsetRef.current + 0.5) % 100;

        // Apply transform with CSS custom property
        containerRef.current.style.setProperty('--offset', `${offsetRef.current}%`);
        
        lastTimeRef.current = timestamp;
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    lastTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Original number of Shefras
  const SHEFRA_COUNT = 50;

  // Create a grid of Shefras
  const createShefraGrid = (offset: number = 0) => (
    <div 
      className="absolute inset-0 grid grid-cols-10 gap-8" 
      style={{ 
        transform: `translateX(${offset}%)`,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      {Array.from({ length: SHEFRA_COUNT }).map((_, i) => (
        <div
          key={i}
          className="w-12 h-12 animate-float"
          style={{
            animationDelay: `${i * 0.1}s`,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            perspective: 1000
          }}
        >
          <img 
            src="/shefra.png" 
            alt="Shefra" 
            className="w-full h-full object-contain dark:filter-none filter brightness-75"
            style={{
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          />
        </div>
      ))}
    </div>
  );

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ 
        opacity: 0.1,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        perspective: 1000
      }}
    >
      <div 
        className="absolute inset-0 animate-scroll"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          perspective: 1000
        }}
      >
        {createShefraGrid(0)}
        {createShefraGrid(100)}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { 
            transform: translateX(var(--offset)) rotate(0deg);
            will-change: transform;
          }
          50% { 
            transform: translateX(var(--offset)) rotate(5deg);
            will-change: transform;
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000;
        }

        .animate-scroll {
          animation: scroll 20s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          perspective: 1000;
        }

        @keyframes scroll {
          0% { 
            transform: translateX(0);
            will-change: transform;
          }
          100% { 
            transform: translateX(-100%);
            will-change: transform;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingShefra; 