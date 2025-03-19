
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { 
  fetchExchangeRates, 
  convertToShefra, 
  CURRENCY_SYMBOLS, 
  CURRENCY_NAMES,
  FALLBACK_RATES,
  type CurrencyCode, 
  type ExchangeRates
} from "@/lib/currencyService";
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

interface CurrencyConverterProps {
  onShefraChange: (amount: number) => void;
}

const CurrencyConverter = ({ onShefraChange }: CurrencyConverterProps) => {
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>(FALLBACK_RATES);
  const [shefraAmount, setShefraAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  
  // Fetch exchange rates on component mount and when currency changes
  useEffect(() => {
    const loadExchangeRates = async () => {
      setIsLoading(true);
      try {
        const data = await fetchExchangeRates("USD");
        setExchangeRates(data.rates);
        // Recalculate Shefra amount with new rates
        if (amount > 0) {
          calculateShefra(amount, currency, data.rates);
        }
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        toast.error("Couldn't load exchange rates. Using fallback data.");
        setExchangeRates(FALLBACK_RATES);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadExchangeRates();
  }, [currency]);
  
  // Calculate Shefra amount
  const calculateShefra = (value: number, fromCurrency: CurrencyCode, rates: ExchangeRates) => {
    const shefras = convertToShefra(value, fromCurrency, rates);
    setShefraAmount(shefras);
    onShefraChange(shefras);
  };
  
  // Handle amount input change
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setAmount(value);
    calculateShefra(value, currency, exchangeRates);
  };
  
  // Handle currency selection change
  const handleCurrencyChange = (value: string) => {
    const newCurrency = value as CurrencyCode;
    setCurrency(newCurrency);
    calculateShefra(amount, newCurrency, exchangeRates);
  };
  
  // Refresh exchange rates
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await fetchExchangeRates("USD");
      setExchangeRates(data.rates);
      calculateShefra(amount, currency, data.rates);
      toast.success("Exchange rates updated successfully!");
    } catch (error) {
      console.error("Failed to refresh exchange rates:", error);
      toast.error("Couldn't refresh exchange rates. Try again later.");
    } finally {
      setIsRefreshing(false);
    }
  };
  
  const currencyCodes = Object.keys(CURRENCY_SYMBOLS) as CurrencyCode[];
  
  return (
    <Card className="glass-panel w-full max-w-xl mx-auto transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-display">Currency Converter</CardTitle>
        <CardDescription>
          Convert any currency to Shefra (1 Shefra = 140 INR)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Amount
          </label>
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {CURRENCY_SYMBOLS[currency]}
              </span>
              <Input
                id="amount"
                type="number"
                placeholder="Enter amount"
                className="pl-8"
                value={amount || ""}
                onChange={handleAmountChange}
                min={0}
                step="0.01"
              />
            </div>
            <Select value={currency} onValueChange={handleCurrencyChange}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                {currencyCodes.map((code) => (
                  <SelectItem key={code} value={code}>
                    {code} - {CURRENCY_NAMES[code]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="pt-4 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Equivalent in Shefra</span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-1 button-shine"
            >
              <RefreshCw size={14} className={isRefreshing ? "animate-spin" : ""} />
              <span className="text-xs">Refresh Rates</span>
            </Button>
          </div>
          <div className="p-6 rounded-lg bg-primary/5 text-center">
            <span className="text-4xl font-display font-medium gradient-text">
              {shefraAmount.toFixed(2)}
            </span>
            <span className="ml-2 text-xl">Shefras</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="text-sm text-muted-foreground">
        {isLoading ? (
          <span className="flex items-center">
            <RefreshCw size={14} className="animate-spin mr-2" />
            Loading exchange rates...
          </span>
        ) : (
          <span>
            Exchange rates last updated: {new Date().toLocaleTimeString()}
          </span>
        )}
      </CardFooter>
    </Card>
  );
};

export default CurrencyConverter;
