"use client";

import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { setCartTotalCookie, updateCartQuantity } from "@/utils/cart_actions";

const CartItem = ({ item }: any) => {
  return (
    <article className="cart-item">
      <div className="card-item-info">
        <div className="card-item-image">
          <Image
            src={item.image}
            alt={item.name}
            width={140}
            height={150}
            className="card-item-image"
          />
        </div>
        <p className="card-item-price">{item.price}$</p>

        <div className="card-item-full-info">
          <h5 className="card-item-title">{item.name}</h5>
          <span className="cart-item-category">{item.category}</span>
          <p className="card-item-description">
            {item.description.split(" ").length > 5
              ? `${item.description.split(" ").slice(0, 5).join(" ")}...`
              : item.description}
          </p>
        </div>
      </div>

      <div className="btn-container">
        <button
          className="cart-btn"
          onClick={() =>
            updateCartQuantity(item.id, "dec").then((arg) => {
              setCartTotalCookie(arg);
            })
          }
        >
          <FaMinus />
        </button>
        <p>{item.quantity}</p>
        <button
          className="cart-btn"
          onClick={() =>
            updateCartQuantity(item.id, "inc").then((arg) => {
              setCartTotalCookie(arg);
            })
          }
        >
          <FaPlus />
        </button>
      </div>
    </article>
  );
};
export default CartItem;
