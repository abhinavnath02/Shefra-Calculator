
export interface SuggestionItem {
  name: string;
  description: string;
  shefraCost: number;
  image: string;
}

export const SUGGESTION_ITEMS: SuggestionItem[] = [
  {
    name: "Premium Coffee",
    description: "Enjoy a luxurious cup of specialty coffee from a high-end café.",
    shefraCost: 2,
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Movie Ticket",
    description: "Catch the latest blockbuster at a premium theater with comfortable seating.",
    shefraCost: 3,
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Gourmet Meal",
    description: "Savor a delicious meal at a mid-range restaurant with excellent cuisine.",
    shefraCost: 5,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Premium Streaming",
    description: "One month subscription to a premium streaming service with unlimited content.",
    shefraCost: 7,
    image: "https://images.unsplash.com/photo-1522869635100-187f6605042d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Designer T-Shirt",
    description: "A high-quality designer t-shirt that combines style and comfort.",
    shefraCost: 10,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Wireless Earbuds",
    description: "Premium wireless earbuds with excellent sound quality and noise cancellation.",
    shefraCost: 15,
    image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Smart Speaker",
    description: "A voice-controlled smart speaker to enhance your home with technology.",
    shefraCost: 20,
    image: "https://images.unsplash.com/photo-1543512214-318c7553f230?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Premium Sneakers",
    description: "Stylish and comfortable premium sneakers from a renowned brand.",
    shefraCost: 30,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Smartwatch",
    description: "A feature-packed smartwatch to track your fitness and stay connected.",
    shefraCost: 40,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Premium Smartphone",
    description: "A high-end smartphone with cutting-edge features and excellent camera.",
    shefraCost: 70,
    image: "https://images.unsplash.com/photo-1551355751-27a935a7eaaf?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Gaming Console",
    description: "The latest gaming console for immersive entertainment experiences.",
    shefraCost: 85,
    image: "https://images.unsplash.com/photo-1605901309584-818e25960a8f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  },
  {
    name: "Premium Laptop",
    description: "A powerful and sleek laptop for work and entertainment.",
    shefraCost: 100,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
  }
];

/**
 * Get suggestions based on Shefra amount
 */
export const getSuggestions = (shefraAmount: number): SuggestionItem[] => {
  if (shefraAmount <= 0) return [];
  
  // Return items that cost less than or equal to the Shefra amount
  return SUGGESTION_ITEMS
    .filter(item => item.shefraCost <= shefraAmount)
    .sort((a, b) => b.shefraCost - a.shefraCost)
    .slice(0, 5);
};
