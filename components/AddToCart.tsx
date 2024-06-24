"use client";

import { addToCart, setCartTotalCookie } from "@/utils/actions/cart_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import { useState } from "react";

const AddToCart = ({ text, product }: { text: string; product: any }) => {
  const { user, error, isLoading } = useUser();
  const [dis, setDis] = useState(false);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <button
      className="single-product-cart-btn"
      disabled={dis}
      onClick={() => {
        setDis(true);
        if (user) {
          addToCart(user?.sub as string, product.id).then((total) => {
            setCartTotalCookie(total);
            setDis(false);
          });
          return;
        } else {
          toast.error("You need to be logged in to add to cart");
          setDis(false);
          return;
        }
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
