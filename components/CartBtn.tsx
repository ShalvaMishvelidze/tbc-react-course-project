"use client";
import { Link } from "@/navigation";
import { getCartQuantity, setCartTotalCookie } from "@/utils/cart_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect } from "react";
import { BsCartCheck } from "react-icons/bs";

export const revalidate = 0;

const CartBtn = ({ cart_total }: any) => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (user) {
      getCartQuantity(user.sub as string).then((quantity) => {
        setCartTotalCookie(quantity);
      });
    }
  }, [user]);

  if (error) {
    return <div className="loading">loading...</div>;
  }

  if (isLoading) {
    return <div className="loading">loading...</div>;
  }

  return (
    <div className="cart-btn">
      <Link href={"/cart"} className="cart-btn">
        <BsCartCheck />
        <span>{cart_total ? cart_total.value : 0}</span>
      </Link>
    </div>
  );
};

export default CartBtn;
