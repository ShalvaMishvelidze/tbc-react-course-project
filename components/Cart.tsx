"use client";

import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  clearCart,
  setCartTotalCookie,
  updateCartQuantity,
} from "@/utils/actions/cart_actions";
import { loadStripe } from "@stripe/stripe-js";
import LoadingSpinner from "./LoadingSpinner";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart = async ({ data, text }: any) => {
  const { user, error, isLoading } = useUser();
  const totalPrice = data.reduce((acc: number, item: any) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  const handleClick = async () => {
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        id: JSON.stringify(user?.sub),
      },
      body: JSON.stringify(data),
    });
    const cartData = await response.json();
    const stripe = await stripePromise;
    const { error } = await stripe!.redirectToCheckout({
      sessionId: cartData.id,
    });
    if (error) {
      console.error("Error redirecting to checkout:", error);
    }
  };

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <main>
      <div className="cart-total">
        <h3>
          {text.totalPrice}: {totalPrice.toFixed(2)}$
        </h3>

        {data.length === 0 ? (
          <p>{text.emptyCart}</p>
        ) : (
          <>
            <button className="cart-total-btn" onClick={handleClick}>
              {text.payNow}
            </button>
            <button
              className="cart-total-btn"
              onClick={() => {
                clearCart(user?.sub as string).then(() =>
                  setCartTotalCookie(0)
                );
              }}
            >
              {text.clearCart}
            </button>
          </>
        )}
      </div>
      <section className="cart">
        {data.map((item: any) => {
          return (
            <article key={item.id} className="cart-item">
              <div className="cart-item-info">
                <div className="cart-item-image">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={500}
                    height={300}
                    className="cart-item-image"
                  />
                </div>
                <p className="cart-item-price">{item.price}$</p>

                <div className="cart-item-full-info">
                  <h5 className="cart-item-title">{item.name}</h5>
                  <span className="cart-item-category">{item.category}</span>
                  <p className="cart-item-description">
                    {item.description.split(" ").length > 5
                      ? `${item.description
                          .split(" ")
                          .slice(0, 5)
                          .join(" ")}...`
                      : item.description}
                  </p>
                </div>
              </div>

              <div className="btn-container">
                <button
                  className="cart-btn"
                  onClick={() =>
                    updateCartQuantity(
                      user?.sub as string,
                      item.id,
                      "dec"
                    ).then((total) => {
                      setCartTotalCookie(total);
                    })
                  }
                >
                  <FaMinus />
                </button>
                <p>{item.quantity}</p>
                <button
                  className="cart-btn"
                  onClick={() =>
                    updateCartQuantity(
                      user?.sub as string,
                      item.id,
                      "inc"
                    ).then((total) => {
                      setCartTotalCookie(total);
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
    </main>
  );
};
export default Cart;
