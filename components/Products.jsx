"use client";
import Product from "./Product";
import { Search } from "./Search";
import { useEffect, useState } from "react";
import Sort from "./Sort";
import Link from "next/link";

const Products = ({ products }) => {
  const [sortedProducts, setSortedProducts] = useState(undefined);
  const [sort, setSort] = useState("a-z");
  const [sortStatus, setSortStatus] = useState("cleared"); // cleared || updated || sorted

  const sortProducts = () => {
    if (sortStatus === "sorted") {
      setSortedProducts([...products]);
      setSortStatus("cleared");
      return;
    }

    setSortedProducts((_) => {
      setSortStatus("sorted");
      if (sort === "a-z") {
        return [...products].sort((a, b) => a.title.localeCompare(b.title));
      }
      if (sort === "z-a") {
        return [...products].sort((a, b) => b.title.localeCompare(a.title));
      }
      if (sort === "price-ascending") {
        return [...products].sort((a, b) => a.price - b.price);
      }
      if (sort === "price-descending") {
        return [...products].sort((a, b) => b.price - a.price);
      }
    });
  };

  const handleChange = (e) => {
    setSort((_) => {
      setSortStatus("updated");
      return e.target.value;
    });
  };

  useEffect(() => {
    if (sortStatus === "cleared") {
      setSortedProducts([...products]);
      return;
    }
    sortProducts();
  }, [products]);

  if (!sortedProducts) {
    return <div className="loading">loading...</div>;
  }

  return (
    <section className="products">
      <Search />
      <div className="products-header">
        <h2>products</h2>
        <Sort handleChange={handleChange} sortProducts={sortProducts} />
      </div>
      <div className="products-container">
        {sortedProducts.map((product) => {
          return (
            <Link href={`/${product.id}`} key={product.id}>
              <Product product={product} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default Products;
