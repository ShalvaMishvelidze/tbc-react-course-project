import { cookies } from "next/headers";
import Link from "next/link";
import { BsCartCheck } from "react-icons/bs";

const CartBtn = () => {
  const cookieStore = cookies();
  const cart_total: any = cookieStore.get("cart_total");

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
