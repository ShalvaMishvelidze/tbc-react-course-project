"use client";

import CartItem from "@/components/CartItem";
import { clearCart, setCartTotalCookie } from "@/utils/cart_actions";
import { GrClear } from "react-icons/gr";

const Cart = ({ products }: any) => {
  const totalPrice = products.reduce((acc: number, item: any) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <section className="cart">
      <div className="cart-total">
        <h3>Total Price: {totalPrice.toFixed(2)}$</h3>
      </div>
      <div className="cart-items">
        {products.map((item: any) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      {products.length === 0 ? (
        <p>Card Is Empty</p>
      ) : (
        <button
          className="cart-clear"
          onClick={() => {
            clearCart(products[0].id).then(() => setCartTotalCookie(0));
          }}
        >
          <GrClear />
        </button>
      )}
    </section>
  );
};
export default Cart;
