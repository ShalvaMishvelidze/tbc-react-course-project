"use client";
import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "@/actions";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { cart_reducer } from "@/reducers/cart_reducer";
import { setCartTotalCookie } from "@/utils/actions";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useReducer,
} from "react";

const CartContext = createContext<any>({});

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useLocalStorage("cart", {});
  const [state, dispatch] = useReducer(cart_reducer, cart);

  const addToCart = (product: any) => {
    console.log("add to cart");

    dispatch({ type: ADD_TO_CART, payload: product });
  };
  const removeItem = (id: number) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };
  const toggleAmount = (id: number, value: string) => {
    console.log("toggle amount");

    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, value } });
  };
  const clearCart = () => {
    console.log("clear cart");
    dispatch({ type: CLEAR_CART });
  };

  useEffect(() => {
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  useEffect(() => {
    setCart(state);
    setCartTotalCookie(state.total_count);
  }, [state.total_count, state.total_price]);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, removeItem, toggleAmount, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  return useContext(CartContext);
};
