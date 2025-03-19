// API endpoint for currency exchange rates
const API_URL = "https://open.er-api.com/v6/latest";

export type CurrencyCode = 
  | "USD" | "EUR" | "GBP" | "JPY" | "AUD" 
  | "CAD" | "CHF" | "CNY" | "HKD" | "NZD" 
  | "INR" | "SGD";

export interface ExchangeRates {
  [key: string]: number;
}

export interface CurrencyData {
  rates: ExchangeRates;
  base: string;
  time_last_updated: number;
}

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  AUD: "A$",
  CAD: "C$",
  CHF: "Fr",
  CNY: "¥",
  HKD: "HK$",
  NZD: "NZ$",
  INR: "₹",
  SGD: "S$"
};

export const CURRENCY_NAMES: Record<CurrencyCode, string> = {
  USD: "US Dollar",
  EUR: "Euro",
  GBP: "British Pound",
  JPY: "Japanese Yen",
  AUD: "Australian Dollar",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Yuan",
  HKD: "Hong Kong Dollar",
  NZD: "New Zealand Dollar",
  INR: "Indian Rupee",
  SGD: "Singapore Dollar"
};

// The Shefra conversion rate: 1 Shefra = 140 INR
export const SHEFRA_RATE = 140;

/**
 * Fetches the latest exchange rates from the API
 */
export const fetchExchangeRates = async (
  baseCurrency: CurrencyCode = "USD"
): Promise<CurrencyData> => {
  try {
    const response = await fetch(`${API_URL}/${baseCurrency}`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch currency data");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching exchange rates:", error);
    throw error;
  }
};

/**
 * Converts an amount from one currency to another
 */
export const convertCurrency = (
  amount: number,
  fromCurrency: CurrencyCode,
  toCurrency: CurrencyCode,
  rates: ExchangeRates
): number => {
  // If rates don't include the target currency, return 0
  if (!rates[toCurrency]) {
    return 0;
  }
  
  // If the currencies are the same, return the original amount
  if (fromCurrency === toCurrency) {
    return amount;
  }
  
  // Convert to the target currency
  const rate = rates[toCurrency];
  return amount * rate;
};

/**
 * Converts an amount from any currency to Shefra
 */
export const convertToShefra = (
  amount: number,
  fromCurrency: CurrencyCode,
  rates: ExchangeRates
): number => {
  const inrAmount = convertCurrency(amount, fromCurrency, "INR", rates);
  return inrAmount / SHEFRA_RATE;
};

// Fallback exchange rates (in case API fails)
export const FALLBACK_RATES: ExchangeRates = {
  USD: 1,
  EUR: 0.91,
  GBP: 0.78,
  JPY: 149.75,  // Fixed: 1 JPY = 0.0067 USD (approximately 149.83 JPY = 1 USD)
  AUD: 1.51,
  CAD: 1.35,
  CHF: 0.87,
  CNY: 7.21,
  HKD: 7.82,
  NZD: 1.64,
  INR: 83.42,
  SGD: 1.33
};
