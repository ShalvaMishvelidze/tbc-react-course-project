"use client";
import { getOrders } from "@/utils/actions/cart_actions";
import { Order } from "@/utils/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UUID } from "crypto";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";
import { toast } from "react-toastify";

const Orders = ({ language }: { language: string }) => {
  const { user, error, isLoading } = useUser();

  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (user) {
      getOrders(user.sub as string).then((res) => {
        setOrders(res as Order[]);
      });
    }
  }, [user]);

  const handleClick = (order_id: UUID) => {
    toast.info("canceling order...");
    fetch("/api/refund", {
      method: "POST",
      body: JSON.stringify({ order_id }),
    }).then(() => {
      setOrders([...orders.filter((order) => order.order_id !== order_id)]);
      toast.success("order canceled");
    });
  };

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Toast />
      <section className="orders">
        {orders.map((order) => {
          const userOffsetMinutes = order.created_at.getTimezoneOffset();

          const userOffsetMillis = userOffsetMinutes * 60 * 1000;
          const localDateObj = new Date(
            order.created_at.getTime() - userOffsetMillis
          );

          const formattedLocalDate = localDateObj.toLocaleString();
          return (
            <div className="order" key={order.order_id}>
              <p>{order.title}</p>
              <p>{order.price}$</p>
              <p>{formattedLocalDate}</p>
              <button type="button" onClick={() => handleClick(order.order_id)}>
                {language === "en" ? "cancel" : "გაუქმება"}
              </button>
            </div>
          );
        })}
        {orders.length === 0 && (
          <h1 className="orders-heading">no orders to show yet</h1>
        )}
      </section>
    </>
  );
};
export default Orders;
