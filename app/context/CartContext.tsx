"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

export type Pizza = {
  name: string;
  price: string;
  description: string;
  image: string;
};

export type CartItem = Pizza & {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (pizza: Pizza) => void;
  increaseQuantity: (pizzaName: string) => void;
  decreaseQuantity: (pizzaName: string) => void;
  removeFromCart: (pizzaName: string) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("pizza-cart");

    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to load cart:", error);
      }
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("pizza-cart", JSON.stringify(cart));
  }, [cart]);

  // Add pizza to cart
  const addToCart = (pizza: Pizza) => {
    setCart((currentCart) => {
      const existingPizza = currentCart.find(
        (item) => item.name === pizza.name
      );

      if (existingPizza) {
        return currentCart.map((item) =>
          item.name === pizza.name
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...pizza,
          quantity: 1,
        },
      ];
    });
  };

  // Increase quantity
  const increaseQuantity = (pizzaName: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.name === pizzaName
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (pizzaName: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.name === pizzaName
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove pizza completely
  const removeFromCart = (pizzaName: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.name !== pizzaName)
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
}