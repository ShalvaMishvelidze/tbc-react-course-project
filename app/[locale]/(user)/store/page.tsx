import Products from "@/components/Products";
import StoreHeader from "@/components/StoreHeader";
import React from "react";

const page = () => {
  return (
    <section className="store">
      <StoreHeader />
      <Products />
    </section>
  );
};

export default page;
