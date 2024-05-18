"use client";
import { changeQuantity, setCartTotalCookie } from "@/utils/actions";
import Link from "next/link";
import { useEffect } from "react";
import { BsCartCheck } from "react-icons/bs";

export const revalidate = 0;

const CartBtn = ({ cart_total }: any) => {
  useEffect(() => {
    changeQuantity(0, "GET").then((arg) => {
      setCartTotalCookie(arg.data);
    });
  }, []);

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
