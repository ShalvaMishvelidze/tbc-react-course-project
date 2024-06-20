"use client";

import { useEffect, useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminPosts from "./AdminPosts";
import AdminUsers from "./AdminUsers";
import AdminOrders from "./AdminOrders";
import { useRouter, useSearchParams } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const [page, setPage] = useState<"products" | "posts" | "users" | "orders">(
    "products"
  );
  const pageParams = useSearchParams();
  const pageString = pageParams.get("page");

  useEffect(() => {
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
          products
        </button>
        <button
          className={page === "posts" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=posts");
          }}
        >
          posts
        </button>
        <button
          className={page === "users" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=users");
          }}
        >
          users
        </button>
        <button
          className={page === "orders" ? "active" : ""}
          type="button"
          onClick={() => {
            router.push("/admin?page=orders");
          }}
        >
          orders
        </button>
      </div>
      <div className="admin-container">
        {page === "products" && <AdminProducts />}
        {page === "posts" && <AdminPosts />}
        {page === "users" && <AdminUsers />}
        {page === "orders" && <AdminOrders />}
      </div>
    </section>
  );
};
export default Admin;
