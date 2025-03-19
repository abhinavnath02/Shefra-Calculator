
import { useEffect, useRef, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";

interface ShefraVisualizationProps {
  amount: number;
}

const ShefraVisualization = ({ amount }: ShefraVisualizationProps) => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevAmountRef = useRef(0);

  // Calculate the meter height based on amount
  useEffect(() => {
    if (amount === 0) {
      setFillPercentage(0);
      prevAmountRef.current = 0;
      return;
    }

    // If amount increased, animate the meter filling up
    if (amount > prevAmountRef.current) {
      setIsAnimating(true);
      
      // Start from current percentage
      const startValue = fillPercentage;
      // Target value (capped at 100)
      const targetValue = Math.min(amount * 10, 100);
      // Animation duration in ms
      const duration = 1000;
      // Start time
      const startTime = performance.now();
      
      const animateFill = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        // Easing function for smoother animation
        const easedProgress = easeOutCubic(progress);
        
        const newValue = startValue + (targetValue - startValue) * easedProgress;
        setFillPercentage(newValue);
        
        if (progress < 1) {
          requestAnimationFrame(animateFill);
        } else {
          setIsAnimating(false);
        }
      };
      
      requestAnimationFrame(animateFill);
    } else if (amount < prevAmountRef.current) {
      // If amount decreased, immediately update without animation
      setFillPercentage(Math.min(amount * 10, 100));
    }
    
    prevAmountRef.current = amount;
  }, [amount]);

  // Easing function for smoother animation
  const easeOutCubic = (x: number): number => {
    return 1 - Math.pow(1 - x, 3);
  };

  // Generate small bubble elements for the meter
  const generateBubbles = () => {
    const bubbles = [];
    for (let i = 0; i < 20; i++) {
      const size = Math.random() * 15 + 5;
      const left = Math.random() * 100;
      const animationDuration = Math.random() * 3 + 2;
      const delay = Math.random() * 2;
      
      bubbles.push(
        <div 
          key={i}
          className="absolute rounded-full bg-white/30"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            bottom: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `float ${animationDuration}s ease-in-out ${delay}s infinite`
          }}
        />
      );
    }
    return bubbles;
  };

  // Food items that appear as the meter fills up
  const foodItems = [
    { threshold: 20, emoji: "🍚", name: "Rice Bowl" },
    { threshold: 40, emoji: "🍜", name: "Noodles" },
    { threshold: 60, emoji: "🍲", name: "Curry" },
    { threshold: 80, emoji: "🍣", name: "Sushi" },
    { threshold: 100, emoji: "🍱", name: "Bento Box" }
  ];

  return (
    <div className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden glass-panel p-5 flex flex-col items-center">
      {/* Fun funky header */}
      <h2 className="font-display text-lg md:text-xl mb-3 text-center transform -rotate-2 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
        Shefra Meter 🍽️
      </h2>
      
      <div className="flex items-end justify-center w-full h-full pb-8 relative">
        {/* The meter container */}
        <div className="relative h-[80%] w-28 md:w-40 bg-gradient-to-b from-purple-100 to-orange-100 dark:from-purple-900/30 dark:to-orange-900/30 rounded-t-2xl overflow-hidden border-2 border-b-0 border-dashed border-purple-300 dark:border-purple-700">
          {/* The fill animation */}
          <div 
            className={cn(
              "absolute bottom-0 w-full bg-gradient-to-t from-orange-400 to-pink-400 transition-all rounded-t-lg",
              isAnimating ? "duration-1000" : "duration-300"
            )}
            style={{ 
              height: `${fillPercentage}%`,
              boxShadow: "0 0 10px rgba(255, 130, 100, 0.7)"
            }}
          >
            {generateBubbles()}
          </div>
          
          {/* Food item indicators */}
          <div className="absolute inset-0 flex flex-col-reverse justify-between pb-2">
            {foodItems.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "flex items-center justify-center transition-all duration-500",
                  fillPercentage >= item.threshold 
                    ? "opacity-100 transform scale-110" 
                    : "opacity-30 scale-90"
                )}
                style={{ height: '20%' }}
              >
                <div className={cn(
                  "w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white shadow-lg transform transition-transform duration-500",
                  fillPercentage >= item.threshold 
                    ? "rotate-0 scale-100" 
                    : "-rotate-12 scale-75"
                )}>
                  <span className="text-3xl md:text-4xl">{item.emoji}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Level indicator lines and labels */}
        <div className="absolute left-0 h-[80%] w-full pointer-events-none flex flex-col-reverse justify-between pr-32 md:pr-36">
          {[0, 20, 40, 60, 80, 100].map((level, index) => (
            <div key={index} className="w-full flex items-center">
              <div className="h-0.5 w-3 bg-gray-400"></div>
              <span className="text-xs text-gray-500 ml-1">{level}%</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Currently unlocked highest food item */}
      <div className="mt-2 text-center">
        {fillPercentage > 0 && (
          <div className="animate-fade-in">
            <p className="text-sm text-muted-foreground">
              Highest food unlocked:
            </p>
            <p className="font-medium text-lg mt-1">
              {foodItems.reduce((highest, item) => 
                fillPercentage >= item.threshold ? item : highest, 
                { threshold: 0, emoji: "❓", name: "Nothing yet" }
              ).name}
            </p>
          </div>
        )}
        
        {fillPercentage === 0 && (
          <p className="text-sm text-muted-foreground">
            Add some Shefra to see your food journey!
          </p>
        )}
      </div>
      
      {/* Add keyframes for bubble animation */}
      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </div>
  );
};

export default ShefraVisualization;
