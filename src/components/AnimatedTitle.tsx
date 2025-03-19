
import { useEffect, useState } from "react";
import { CakeSlice, IceCream, Cookie } from "lucide-react";

const AnimatedTitle = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center transition-all duration-500">
      <div className="flex items-center gap-3 mb-3">
        <CakeSlice 
          className={`w-8 h-8 md:w-10 md:h-10 text-orange-400 opacity-0 animate-float ${isVisible ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.1s' }}
        />
        <h1 
          className={`text-4xl md:text-6xl font-display font-bold mb-2 
                    bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 
                    bg-clip-text text-transparent drop-shadow-md
                    opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
          style={{ 
            animationDelay: '0.3s',
            transform: 'rotate(-2deg)',
            letterSpacing: '1px'
          }}
        >
          Shefra Calculator
        </h1>
        <Cookie 
          className={`w-8 h-8 md:w-10 md:h-10 text-purple-400 opacity-0 animate-float ${isVisible ? 'animate-fade-in' : ''}`}
          style={{ animationDelay: '0.1s' }}
        />
      </div>
      <p 
        className={`text-lg md:text-xl font-medium text-center mx-auto
                  bg-gradient-to-r from-purple-400 to-pink-400 
                  bg-clip-text text-transparent
                  opacity-0 ${isVisible ? 'animate-fade-in' : ''}`}
        style={{ 
          animationDelay: '0.6s',
          maxWidth: '90%'
        }}
      >
        Convert any currency to Shefra, where 1 Shefra = 140 INR
      </p>
    </div>
  );
};

export default AnimatedTitle;
