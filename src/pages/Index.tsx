
import { useState } from "react";
import AnimatedTitle from "@/components/AnimatedTitle";
import CurrencyConverter from "@/components/CurrencyConverter";
import SuggestionList from "@/components/SuggestionList";
import ShefraVisualization from "@/components/ShefraVisualization";
import ThemeToggle from "@/components/ThemeToggle";
import { Cookie, IceCream, Pizza } from "lucide-react";

const Index = () => {
  const [shefraAmount, setShefraAmount] = useState<number>(0);
  
  const handleShefraChange = (amount: number) => {
    setShefraAmount(amount);
  };
  
  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gradient-to-b from-purple-50 to-orange-50 dark:from-purple-900/20 dark:to-orange-900/20">
      <header className="w-full p-6 flex justify-end">
        <ThemeToggle />
      </header>
      
      <main className="flex-1 container px-4 pb-20">
        <div className="flex flex-col gap-12 pt-6 md:pt-16">
          <AnimatedTitle />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <CurrencyConverter onShefraChange={handleShefraChange} />
            <ShefraVisualization amount={shefraAmount} />
          </div>
          
          <SuggestionList shefraAmount={shefraAmount} />
        </div>
      </main>
      
      <footer className="py-8 border-t-4 border-dashed border-purple-200 dark:border-purple-800 bg-gradient-to-r from-pink-100 to-orange-100 dark:from-pink-900/20 dark:to-orange-900/20">
        <div className="container flex flex-col md:flex-row items-center justify-center gap-4 text-base text-center">
          <IceCream className="w-6 h-6 text-pink-400" />
          <p className="font-medium bg-gradient-to-r from-pink-500 to-orange-500 bg-clip-text text-transparent">
            Shefra Calculator &copy; {new Date().getFullYear()} | 1 Shefra = 140 INR
          </p>
          <Pizza className="w-6 h-6 text-orange-400" />
        </div>
      </footer>
    </div>
  );
};

export default Index;
