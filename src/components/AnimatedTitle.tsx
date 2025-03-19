import { useEffect, useState } from "react";
import { CakeSlice, IceCream, Cookie } from "lucide-react";
import { motion } from "framer-motion";

const AnimatedTitle = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  return (
    <div className="flex flex-col items-center justify-center transition-all duration-500">
      <div className="flex items-center gap-3 mb-3">
        <motion.div
          whileHover={{ scale: 1.2, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <CakeSlice 
            className="w-8 h-8 md:w-10 md:h-10 text-orange-400"
          />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-6xl font-display font-bold mb-2 
                    bg-gradient-to-r from-pink-500 via-purple-500 to-orange-400 
                    bg-clip-text text-transparent drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          style={{ letterSpacing: '1px' }}
        >
          Shefra Calculator
        </motion.h1>
        
        <motion.div
          whileHover={{ scale: 1.2, rotate: -15 }}
          whileTap={{ scale: 0.9 }}
          animate={{ 
            y: [0, -10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <Cookie 
            className="w-8 h-8 md:w-10 md:h-10 text-purple-400"
          />
        </motion.div>
      </div>
      
      <motion.p 
        className="text-lg md:text-xl font-medium text-center mx-auto
                  bg-gradient-to-r from-purple-400 to-pink-400 
                  bg-clip-text text-transparent"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        whileHover={{ scale: 1.02 }}
        style={{ maxWidth: '90%' }}
      >
        Convert any currency to Shefra, where 1 Shefra = 140 INR
      </motion.p>
    </div>
  );
};

export default AnimatedTitle;
