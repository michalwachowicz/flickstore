/* eslint-disable react-refresh/only-export-components */
import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { getMovieDetails } from "../api/moviesApi";
import { setMovie } from "../managers/moviesManager";

interface CartAction {
  type: "added" | "deleted" | "cleared";
  id?: number;
}

const CartContext = createContext<number[]>([]);
const CartDispatchContext = createContext<Dispatch<CartAction>>(() => {});

const cartReducer = (cart: number[], action: CartAction) => {
  switch (action.type) {
    case "added": {
      if (action.id === undefined) return cart;

      const list = [...cart, action.id];
      localStorage.setItem("cart", JSON.stringify(list));

      return list;
    }
    case "deleted": {
      if (action.id === undefined) return cart;

      const list = cart.filter((id) => id !== action.id);
      localStorage.setItem("cart", JSON.stringify(list));

      return list;
    }
    case "cleared":
      return [];
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

export const useCart = () => useContext(CartContext);
export const useCartDispatch = () => useContext(CartDispatchContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, dispatch] = useReducer(
    cartReducer,
    JSON.parse(localStorage.getItem("cart") || "[]"),
  );

  (async () => {
    await Promise.all(
      cart.map(async (id) => {
        const data = await getMovieDetails(id);
        setMovie(id, data);
      }),
    );
  })();

  return (
    <CartContext.Provider value={cart}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};
