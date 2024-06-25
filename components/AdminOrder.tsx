"use client";

import { toast } from "react-toastify";

const AdminOrder = ({ order, setDel, text }: any) => {
  const userOffsetMinutes = order.created_at.getTimezoneOffset();

  const userOffsetMillis = userOffsetMinutes * 60 * 1000;
  const localDateObj = new Date(order.created_at.getTime() - userOffsetMillis);

  const formattedLocalDate = localDateObj.toLocaleString();
  return (
    <div className="admin-order">
      <div className="admin-order-container">
        <h2 className="admin-order-name">{order.name} </h2>
        <p className="admin-order-email">{order.email}</p>
      </div>
      <h3 className="admin-order-title">{order.title}</h3>
      <p className="admin-order-date">{formattedLocalDate}</p>
      <h2 className="admin-order-price">{order.price}$</h2>
      <button
        className="admin-order-btn"
        onClick={async () => {
          toast.info("Refunding order");
          await fetch("/api/refund", {
            method: "POST",
            body: JSON.stringify({ order_id: order.order_id }),
          });
          setDel(true);
          toast.success("Order refunded");
        }}
      >
        {text}
      </button>
    </div>
  );
};
export default AdminOrder;
