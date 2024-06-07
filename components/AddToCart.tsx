"use client";

import { addToCart, setCartTotalCookie } from "@/utils/cart_actions";
import { useUser } from "@auth0/nextjs-auth0/client";

const AddToCart = ({ text, product }: { text: string; product: any }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) {
    return <div className="loading">loading...</div>;
  }

  if (error) {
    return <div className="loading">loading...</div>;
  }

  return (
    <button
      className="cart-btn"
      onClick={() => {
        addToCart(user?.sub as string, product.id).then((arg) =>
          setCartTotalCookie(arg)
        );
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
