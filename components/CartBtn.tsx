"use client";
import {
  getCartQuantity,
  setCartTotalCookie,
} from "@/utils/actions/cart_actions";
import Link from "next/link";
import { useEffect } from "react";
import { BsCartCheck } from "react-icons/bs";

export const revalidate = 0;

const CartBtn = ({ user, cart_total }: any) => {
  useEffect(() => {
    getCartQuantity(user?.sub as string).then((quantity) => {
      setCartTotalCookie(quantity);
    });
  }, [user]);

  return (
    <Link href={"/cart"} className="cart-btn">
      <BsCartCheck />
      <span>{cart_total ? cart_total.value : 0}</span>
    </Link>
  );
};
export default CartBtn;
