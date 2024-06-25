"use client";

import { useEffect, useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminPosts from "./AdminPosts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import { useRouter, useSearchParams } from "next/navigation";
import Toast from "./Toast";

const Admin = ({ products, text }: any) => {
  const router = useRouter();
  const [page, setPage] = useState<"products" | "posts" | "users" | "orders">(
    "products"
  );
  const pageParams = useSearchParams();
  const pageString = pageParams.get("page");

  useEffect(() => {
    console.log("effect fire");

    if (pageString) {
      setPage(pageString as "products" | "posts" | "users" | "orders");
    } else {
      router.push("/admin?page=products");
    }
  }, [pageString]);

  return (
    <section className="admin">
      <div className="admin-nav">
        <button
          className={page === "products" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=products");
          }}
        >
          {text.products}
        </button>
        <button
          className={page === "posts" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=posts");
          }}
        >
          {text.posts}
        </button>
        <button
          className={page === "users" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=users");
          }}
        >
          {text.users}
        </button>
        <button
          className={page === "orders" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=orders");
          }}
        >
          {text.orders}
        </button>
      </div>
      <div className="admin-container">
        <Toast />
        {page === "products" && (
          <AdminProducts products={products} text={text} />
        )}
        {page === "posts" && <AdminPosts text={text} />}
        {page === "users" && <AdminUsers text={text} />}
        {page === "orders" && <AdminOrders text={text} />}
      </div>
    </section>
  );
};
export default Admin;
