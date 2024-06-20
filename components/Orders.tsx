"use client";
import { getOrders } from "@/utils/actions/cart_actions";
import { Order } from "@/utils/interfaces";
import { useUser } from "@auth0/nextjs-auth0/client";
import { UUID } from "crypto";
import { useEffect, useState } from "react";

const Orders = () => {
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
    fetch("/api/refund", {
      method: "POST",
      body: JSON.stringify({ order_id }),
    }).then(() => {
      setOrders([...orders.filter((order) => order.order_id !== order_id)]);
    });
  };

  if (error || isLoading) {
    return <div className="loading">loading...</div>;
  }

  return (
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
            <p>{order.price}</p>
            <p>{formattedLocalDate}</p>
            <button type="button" onClick={() => handleClick(order.order_id)}>
              cancel
            </button>
          </div>
        );
      })}
    </section>
  );
};
export default Orders;
