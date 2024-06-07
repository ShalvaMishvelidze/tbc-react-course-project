"use client";
import {
  changeQuantity,
  // , setCartTotalCookie
} from "@/utils/actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useEffect } from "react";
import { BsCartCheck } from "react-icons/bs";

export const revalidate = 0;

const CartBtn = ({ cart_total }: any) => {
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    changeQuantity(user?.sub as string, 0, "GET");
    // .then((arg) => {
    //   setCartTotalCookie(arg.data);
    // });
  }, [user]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

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
