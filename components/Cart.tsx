"use client";
import { useCartContext } from "@/context/cart_context";
import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GrClear } from "react-icons/gr";

const Cart = () => {
  const { cart, toggleAmount, clearCart } = useCartContext();
  const data = [];
  for (const key in cart) {
    data.push(cart[key]);
  }

  return (
    <section className="cart">
      <button className="cart-clear" onClick={clearCart}>
        <GrClear />
      </button>
      {data.map((item: any) => {
        return (
          <article key={item.id} className="cart-item">
            <h5>{item.title}</h5>
            <Image
              src={item.thumbnail}
              alt={item.title}
              width={140}
              height={90}
            />
            <p>{item.price}$</p>
            <div className="btn-container">
              <button
                className="cart-btn"
                onClick={() => toggleAmount(item.id, "dec")}
              >
                <FaMinus />
              </button>
              <p>{item.count}</p>
              <button
                className="cart-btn"
                onClick={() => toggleAmount(item.id, "inc")}
              >
                <FaPlus />
              </button>
            </div>
          </article>
        );
      })}
    </section>
  );
};
export default Cart;
