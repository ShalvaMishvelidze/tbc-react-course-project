import { products } from "../utils/constants";
import Product from "./Product";
import { Search } from "./Search";
import React from "react";

const Products = () => {
  return (
    <section className="products">
      <div className="products-header">
        <h2>products</h2>
        <Search />
      </div>
      <div className="products-container">
        {products.map((product) => {
          return <Product product={product} />;
        })}
      </div>
    </section>
  );
};

export default Products;
