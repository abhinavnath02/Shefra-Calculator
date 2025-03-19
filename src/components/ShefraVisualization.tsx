import { useEffect, useRef, useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";

interface ShefraVisualizationProps {
  amount: number;
}

const ShefraVisualization = ({ amount }: ShefraVisualizationProps) => {
  const [fillPercentage, setFillPercentage] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredFood, setHoveredFood] = useState<string | null>(null);
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
    { threshold: 20, emoji: "🍚", name: "Rice Bowl", description: "A delicious bowl of rice!" },
    { threshold: 40, emoji: "🍜", name: "Noodles", description: "Slurp-worthy noodles!" },
    { threshold: 60, emoji: "🍲", name: "Curry", description: "Spicy and flavorful curry!" },
    { threshold: 80, emoji: "🍣", name: "Sushi", description: "Fresh and tasty sushi!" },
    { threshold: 100, emoji: "🍱", name: "Bento Box", description: "A complete meal in a box!" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden glass-panel p-5 flex flex-col items-center"
    >
      {/* Fun funky header */}
      <motion.h2 
        className="font-display text-lg md:text-xl mb-3 text-center transform -rotate-2 bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        Shefra Meter 🍽️
      </motion.h2>
      
      <div className="flex items-end justify-center w-full h-full pb-8 relative">
        {/* The meter container */}
        <motion.div 
          className="relative h-[80%] w-28 md:w-40 bg-gradient-to-b from-purple-100 to-orange-100 dark:from-purple-900/30 dark:to-orange-900/30 rounded-t-2xl overflow-hidden border-2 border-b-0 border-dashed border-purple-300 dark:border-purple-700"
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          {/* The fill animation */}
          <motion.div 
            className={cn(
              "absolute bottom-0 w-full bg-gradient-to-t from-orange-400 to-pink-400 transition-all rounded-t-lg",
              isAnimating ? "duration-500" : "duration-200"
            )}
            style={{ 
              height: `${fillPercentage}%`,
              boxShadow: "0 0 10px rgba(255, 130, 100, 0.7)"
            }}
          >
            {generateBubbles()}
          </motion.div>
          
          {/* Food item indicators */}
          <div className="absolute inset-0 flex flex-col-reverse justify-between pb-2">
            {foodItems.map((item, index) => (
              <motion.div 
                key={index} 
                className={cn(
                  "flex items-center justify-center transition-all duration-300 cursor-pointer",
                  fillPercentage >= item.threshold 
                    ? "opacity-100 transform scale-110" 
                    : "opacity-30 scale-90"
                )}
                style={{ height: '20%' }}
                onHoverStart={() => setHoveredFood(item.name)}
                onHoverEnd={() => setHoveredFood(null)}
                whileHover={{ scale: 1.1, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                animate={{ 
                  y: fillPercentage >= item.threshold ? [0, -3, 0] : 0,
                  rotate: fillPercentage >= item.threshold ? [0, 2, -2, 0] : 0
                }}
                transition={{ 
                  y: { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0 },
                  rotate: { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0 }
                }}
              >
                <motion.div 
                  className={cn(
                    "w-12 h-12 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-white shadow-lg transform transition-transform duration-300",
                    fillPercentage >= item.threshold 
                      ? "rotate-0 scale-100" 
                      : "-rotate-12 scale-75"
                  )}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 15px rgba(255, 130, 100, 0.3)"
                  }}
                >
                  <span className="text-3xl md:text-4xl">{item.emoji}</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Level indicator lines and labels */}
        <div className="absolute left-0 h-[80%] w-full pointer-events-none flex flex-col-reverse justify-between pr-32 md:pr-36">
          {[0, 20, 40, 60, 80, 100].map((level, index) => (
            <motion.div 
              key={index} 
              className="w-full flex items-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="h-0.5 w-3 bg-gray-400"></div>
              <span className="text-xs text-gray-500 ml-1">{level}%</span>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Currently unlocked highest food item */}
      <AnimatePresence>
        {fillPercentage > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="mt-2 text-center"
          >
            <motion.p 
              className="text-sm text-muted-foreground"
              whileHover={{ scale: 1.02 }}
            >
              Highest food unlocked:
            </motion.p>
            <motion.p 
              className="font-medium text-lg mt-1"
              whileHover={{ scale: 1.05 }}
              animate={{ 
                scale: hoveredFood ? 1.05 : 1,
                color: hoveredFood ? "#FF6B6B" : "inherit"
              }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {foodItems.reduce((highest, item) => 
                fillPercentage >= item.threshold ? item : highest, 
                { threshold: 0, emoji: "❓", name: "Nothing yet" }
              ).name}
            </motion.p>
          </motion.div>
        )}
        
        {fillPercentage === 0 && (
          <motion.p 
            className="text-sm text-muted-foreground"
            whileHover={{ scale: 1.02 }}
            animate={{ 
              scale: [1, 1.02, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            Add some Shefra to see your food journey!
          </motion.p>
        )}
      </AnimatePresence>
      
      {/* Add keyframes for bubble animation */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
      `}</style>
    </motion.div>
  );
};

export default ShefraVisualization;
