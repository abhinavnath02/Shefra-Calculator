
import { useEffect, useState } from "react";
import { getSuggestions, SuggestionItem } from "@/lib/suggestionData";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface SuggestionListProps {
  shefraAmount: number;
}

const SuggestionList = ({ shefraAmount }: SuggestionListProps) => {
  const [suggestions, setSuggestions] = useState<SuggestionItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (shefraAmount > 0) {
      setSuggestions(getSuggestions(shefraAmount));
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [shefraAmount]);
  
  if (!isVisible || suggestions.length === 0) {
    return null;
  }
  
  return (
    <div className="w-full max-w-4xl mx-auto mt-10 opacity-0 animate-fade-in">
      <h2 className="text-2xl font-display font-medium mb-6 text-center">
        What you could buy with {shefraAmount.toFixed(2)} Shefras
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggestions.map((item, index) => (
          <Card 
            key={`${item.name}-${index}`}
            className="overflow-hidden glass-panel transition-all duration-300 hover:shadow-lg"
          >
            <div className="h-48 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{item.name}</CardTitle>
              <CardDescription className="flex items-center gap-1">
                <span className="text-shefra font-medium">{item.shefraCost.toFixed(2)} Shefras</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {item.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SuggestionList;
