"use client";

import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { changeQuantity, setCartTotalCookie } from "@/utils/actions";

const Cart = async ({ data }: any) => {
  return (
    <section className="cart">
      <button className="cart-clear">
        <GrClear />
      </button>
      {data.data.map((item: any) => {
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
                onClick={() =>
                  changeQuantity(item.id, "dec").then((arg) => {
                    console.log(arg);
                    setCartTotalCookie(arg.data.total_quantity);
                  })
                }
              >
                <FaMinus />
              </button>
              <p>{item.quantity}</p>
              <button
                className="cart-btn"
                onClick={() =>
                  changeQuantity(item.id, "inc").then((arg) => {
                    setCartTotalCookie(arg.data.total_quantity);
                  })
                }
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
