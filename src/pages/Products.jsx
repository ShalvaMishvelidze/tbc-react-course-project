import { products as staticProducts } from "../utils/constants";
import Product from "../components/Product";
// import { Search } from "../components/Search";
import React, { useState } from "react";
import Sort from "../components/Sort";

const Products = () => {
  const [products, setProducts] = useState(staticProducts);
  const [sort, setSort] = useState("a-z");
  const [clearSort, setClearSort] = useState(true);

  const sortProducts = () => {
    if (clearSort) {
      setProducts(staticProducts);
      setClearSort(false);
      return;
    }
    setProducts((prevState) => {
      setClearSort(true);
      if (sort === "a-z") {
        return [...prevState].sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sort === "z-a") {
        return [...prevState].sort((a, b) => b.title.localeCompare(a.title));
      }
      if (sort === "price-ascending") {
        return [...prevState].sort((a, b) => a.price - b.price);
      }
      if (sort === "price-descending") {
        return [...prevState].sort((a, b) => b.price - a.price);
      }
    });
  };

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  return (
    <section className="products">
      <div className="products-header">
        <h2>products</h2>
        {/* <Search /> */}
        <Sort handleChange={handleChange} sortProducts={sortProducts} />
      </div>
      <div className="products-container">
        {products.map((product) => {
          return <Product key={product.id} product={product} />;
        })}
      </div>
    </section>
  );
};

export default Products;
