"use client";

import { setCartTotalCookie } from "@/utils/actions";

const AddToCart = ({ text, product }: { text: string; product: any }) => {
  const addProduct = async () => {
    const response = await fetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({ product_id: product.id }),
    });
    const data = await response.json();
    await setCartTotalCookie(data.quantity);
  };

  return (
    <button
      className="cart-btn"
      onClick={() => {
        addProduct();
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
