"use client";
import {
  getCartQuantity,
  setCartTotalCookie,
} from "@/utils/actions/cart_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useEffect } from "react";
import { BsCartCheck } from "react-icons/bs";
import LoadingSpinner from "./LoadingSpinner";

export const revalidate = 0;

const CartBtn = ({ cart_total }: any) => {
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    getCartQuantity(user?.sub as string).then((quantity) => {
      setCartTotalCookie(quantity);
    });
  }, [user]);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <Link href={"/cart"} className="cart-btn">
      <BsCartCheck />
      <span>{cart_total ? cart_total.value : 0}</span>
    </Link>
  );
};
export default CartBtn;
