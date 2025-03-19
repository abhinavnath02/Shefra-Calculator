import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import AnimatedTitle from "@/components/AnimatedTitle";
import CurrencyConverter from "@/components/CurrencyConverter";
import SuggestionList from "@/components/SuggestionList";
import ShefraVisualization from "@/components/ShefraVisualization";
import ThemeToggle from "@/components/ThemeToggle";
import FloatingShefra from "@/components/FloatingShefra";
import { Cookie, IceCream, Pizza, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [shefraAmount, setShefraAmount] = useState<number>(0);
  
  const handleShefraChange = (amount: number) => {
    setShefraAmount(amount);
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-b from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20 relative"
    >
      <FloatingShefra amount={shefraAmount} />
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full p-6 flex justify-end items-center gap-4"
      >
        <Button asChild variant="ghost" size="icon">
          <Link to="/about">
            <User className="h-5 w-5" />
          </Link>
        </Button>
        <ThemeToggle />
      </motion.header>
      
      <main className="flex-1 container px-4 pb-20">
        <div className="flex flex-col gap-12 pt-6 md:pt-16">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AnimatedTitle />
          </motion.div>
          
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
          >
            <CurrencyConverter onShefraChange={handleShefraChange} />
            <ShefraVisualization amount={shefraAmount} />
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <SuggestionList shefraAmount={shefraAmount} />
          </motion.div>
        </div>
      </main>
      
      <motion.footer 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="py-8 border-t-4 border-dashed border-purple-200 dark:border-purple-800 bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/20 dark:to-orange-900/20"
      >
        <div className="container flex flex-col md:flex-row items-center justify-center gap-4 text-base text-center">
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1.1, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0
            }}
          >
            <IceCream className="w-6 h-6 text-pink-400" />
          </motion.div>
          <p className="font-medium bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Shefra Calculator &copy; {new Date().getFullYear()} | 1 Shefra = 140 INR
          </p>
          <motion.div
            animate={{ 
              rotate: [0, -10, 10, 0],
              scale: [1, 1.1, 1.1, 1]
            }}
            transition={{ 
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
              delay: 0
            }}
          >
            <Pizza className="w-6 h-6 text-orange-400" />
          </motion.div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default Index;
