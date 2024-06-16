"use client";

import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import { useUser } from "@auth0/nextjs-auth0/client";
import {
  clearCart,
  setCartTotalCookie,
  updateCartQuantity,
} from "@/utils/actions/cart_actions";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Cart = async ({ data }: any) => {
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

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <div className="cart-total">
        <h3>Total Price: {totalPrice.toFixed(2)}$</h3>
        <button className="cart-total-btn" onClick={handleClick}>
          Pay Now
        </button>
      </div>
      <section className="cart">
        {data.map((item: any) => {
          return (
            <article key={item.id} className="cart-item">
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
        {data.length === 0 ? (
          <p>Card Is Empty</p>
        ) : (
          <button
            className="cart-clear"
            onClick={() => {
              clearCart(user?.sub as string).then(() => setCartTotalCookie(0));
            }}
          >
            <GrClear />
          </button>
        )}
      </section>
    </main>
  );
};
export default Cart;
