"use client";
import { PRODUCTS_API_URL as api_url } from "../utils/constants";
import Product from "../components/Product";
import { Search } from "../components/Search";
import { useEffect, useState } from "react";
import Sort from "../components/Sort";
import Link from "next/link";

const Products = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [sort, setSort] = useState("a-z");
  const [sortStatus, setSortStatus] = useState("cleared"); // cleared || updated || sorted
  const [search, setSearch] = useState("");

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

  const getProducts = async (searchString) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${api_url}/search?q=${searchString || search}`
      );
      const data = await response.json();
      setProducts([...data.products]);
      setLoading(false);
    } catch (e) {
      setLoading(true);
      console.error(e);
    }
  };

  const handleChange = (e) => {
    setSort((_) => {
      setSortStatus("updated");
      return e.target.value;
    });
  };

  useEffect(() => {
    getProducts();
  }, [search]);

  useEffect(() => {
    if (sortStatus === "cleared") {
      setSortedProducts([...products]);
      return;
    }
    sortProducts();
  }, [products]);

  const debounce = () => {
    let timeoutID;
    return (e) => {
      setSortStatus("updated");
      setSearch(e.target.value);
      clearTimeout(timeoutID);
      timeoutID = setTimeout(() => {
        getProducts(e.target.value);
      }, 500);
    };
  };

  return (
    <section className="products">
      <Search handleSearch={debounce()} search={search} />
      <div className="products-header">
        <h2>products</h2>
        <Sort handleChange={handleChange} sortProducts={sortProducts} />
      </div>
      <div className="products-container">
        {loading && (
          <div className="loading">
            <h1>loading...</h1>
          </div>
        )}
        {loading ||
          sortedProducts.map((product) => {
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
