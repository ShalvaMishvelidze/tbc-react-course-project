"use client";

import { addToCart, setCartTotalCookie } from "@/utils/actions/cart_actions";
import { toast } from "react-toastify";

const AddToCart = ({
  text,
  product,
  user,
}: {
  text: string;
  product: any;
  user: { sub: string };
}) => {
  return (
    <button
      className="single-product-cart-btn"
      onClick={() => {
        if (user) {
          addToCart(user?.sub as string, product.id).then((total) => {
            setCartTotalCookie(total);
          });
        } else {
          toast.error("You need to be logged in to add to cart");
        }
      }}
    >
      {text}
    </button>
  );
};
export default AddToCart;
