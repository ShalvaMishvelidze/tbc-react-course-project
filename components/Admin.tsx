"use client";

import { useState } from "react";
import AdminProducts from "./AdminProducts";
import AdminPosts from "./AdminPosts";
import AdminUsers from "./AdminUsers";

const Admin = () => {
  const [page, setPage] = useState<"products" | "posts" | "users">("products");
  return (
    <section className="admin">
      <div className="admin-nav">
        <button
          className={page === "products" ? "active" : ""}
          type="button"
          onClick={() => setPage("products")}
        >
          products
        </button>
        <button
          className={page === "posts" ? "active" : ""}
          type="button"
          onClick={() => setPage("posts")}
        >
          posts
        </button>
        <button
          className={page === "users" ? "active" : ""}
          type="button"
          onClick={() => setPage("users")}
        >
          users
        </button>
      </div>
      <div className="admin-container">
        {page === "products" && <AdminProducts />}
        {page === "posts" && <AdminPosts />}
        {page === "users" && <AdminUsers />}
      </div>
    </section>
  );
};
export default Admin;
