"use client";

import Image from "next/image";
import { FaPlus, FaMinus } from "react-icons/fa";
import { GrClear } from "react-icons/gr";
import {
  changeQuantity,
  emptyCart,
  // , setCartTotalCookie
} from "@/utils/actions";
import { useUser } from "@auth0/nextjs-auth0/client";

const Cart = async ({ data }: any) => {
  const { user, error, isLoading } = useUser();
  const totalPrice = data.data.reduce((acc: number, item: any) => {
    return acc + parseFloat(item.price) * item.quantity;
  }, 0);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <main>
      <div className="cart-total">
        <h3>Total Price: {totalPrice.toFixed(2)}$</h3>
      </div>
      <section className="cart">
        {data.data.map((item: any) => {
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
                  onClick={
                    () => changeQuantity(user?.sub as string, item.id, "dec")
                    // .then(
                    //   (arg) => {
                    //     console.log(arg);
                    //     setCartTotalCookie(arg.data);
                    //   }
                    // )
                  }
                >
                  <FaMinus />
                </button>
                <p>{item.quantity}</p>
                <button
                  className="cart-btn"
                  onClick={
                    () => changeQuantity(user?.sub as string, item.id, "inc")
                    // .then(
                    //   (arg) => {
                    //     setCartTotalCookie(arg.data);
                    //   }
                    // )
                  }
                >
                  <FaPlus />
                </button>
              </div>
            </article>
          );
        })}
        {data.data.length === 0 ? (
          <p>Card Is Empty</p>
        ) : (
          <button
            className="cart-clear"
            onClick={() => {
              emptyCart(user?.sub as string);
              // .then(() => setCartTotalCookie(0));
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
