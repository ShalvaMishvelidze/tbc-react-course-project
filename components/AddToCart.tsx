"use client";

import { addToCart, setCartTotalCookie } from "@/utils/actions/cart_actions";
import { useUser } from "@auth0/nextjs-auth0/client";

const AddToCart = ({ text, product }: { text: string; product: any }) => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <button
      className="cart-btn"
      onClick={() => {
        addToCart(user?.sub as string, product.id).then((total) => {
          setCartTotalCookie(total);
        });
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
