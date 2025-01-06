/* eslint-disable react-refresh/only-export-components */
import React, { createContext, Dispatch, useContext, useReducer } from "react";

interface CartAction {
  type: "added" | "deleted" | "cleared";
  id: number;
}

const CartContext = createContext<number[]>([]);
const CartDispatchContext = createContext<Dispatch<CartAction>>(() => {});

const cartReducer = (cart: number[], action: CartAction) => {
  switch (action.type) {
    case "added":
      return [...cart, action.id];
    case "deleted":
      return cart.filter((id) => id !== action.id);
    case "cleared":
      return [];
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
