"use client";
import { useCartContext } from "@/context/cart_context";
import { useEffect } from "react";

const AddToCart = ({ text, product }: { text: string; product: any }) => {
  const { cart, addToCart } = useCartContext();

  useEffect(() => {
    console.log("cart", cart);
  }, [cart]);

  return (
    <button
      className="cart-btn"
      onClick={() => {
        addToCart(product);
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
