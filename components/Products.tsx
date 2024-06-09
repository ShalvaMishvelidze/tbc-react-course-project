"use client";
import Product from "./Product";
import { Search } from "./Search";
import { ChangeEvent, useEffect, useState } from "react";
import Sort from "./Sort";
import Link from "next/link";
import { Product as P, Products as Type } from "@/utils/interfaces";

const Products = ({
  products,
  pageText,
}: {
  products: P[];
  pageText: Type;
}) => {
  console.log(products);

  const [sortedProducts, setSortedProducts] = useState<P[] | undefined>(
    undefined
  );
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
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      }
      if (sort === "z-a") {
        return [...products].sort((a, b) => b.name.localeCompare(a.name));
      }
      if (sort === "price-ascending") {
        return [...products].sort((a, b) => a.price - b.price);
      }
      if (sort === "price-descending") {
        return [...products].sort((a, b) => b.price - a.price);
      }
      return _;
    });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSort((_) => {
      setSortStatus("updated");
      return e.target.value;
    });
  };

  useEffect(() => {
    setSortedProducts([...products]);
  }, [products]);

  if (!sortedProducts) {
    return (
      <div className="products loading">
        <div className="search"></div>
        <div className="products-header">
          <div className="products-header-title"></div>
          <div className="sort"></div>
        </div>
      </div>
    );
  }

  return (
    <section className="products">
      <Search pageText={pageText.search} />
      <div className="products-header">
        <h2 className="products-header-title">{pageText.heading as string}</h2>
        <Link href="/add-new-product">add new product</Link>
        <Sort
          pageText={pageText.sort}
          handleChange={handleChange}
          sortProducts={sortProducts}
        />
      </div>
      <div className="products-container">
        {sortedProducts.map((product) => {
          return (
            <Link href={`/${product.id}`} key={product.id}>
              <Product
                product={product}
                addToCart={pageText.addToCart as string}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default Products;
