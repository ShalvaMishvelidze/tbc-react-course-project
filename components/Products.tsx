"use client";
import Product from "./Product";
import { Search } from "./Search";
import { useEffect, useState } from "react";
import Sort from "./Sort";
import Link from "next/link";
import { Product as P, Products as Type } from "@/utils/interfaces";
import PageSelector from "./PageSelector";
import { getPageCount, getProducts } from "@/utils/actions/products_actions";
import { useSearchParams } from "next/navigation";

const Products = ({
  products,
  pageText,
}: {
  products: P[];
  pageText: Type;
}) => {
  const [search, setSearch] = useState("");
  const [sortedProducts, setSortedProducts] = useState<P[] | undefined>(
    undefined
  );
  const [sortStatus, setSortStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  useEffect(() => {
    if (searchString) {
      setCurrentPage(1);
      setSearch(searchString);
    }
  }, [searchString]);

  useEffect(() => {
    getProducts(search, "", "", currentPage).then((products) => {
      setSortedProducts(products as P[]);
    });
  }, [search, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortProducts = (sort: string) => {
    if (sortStatus === sort) {
      setSortStatus("");
      getProducts(search, "", "", currentPage).then((products) => {
        setSortedProducts(products as P[]);
      });
      return;
    }

    if (sort === "a-z") {
      setSortStatus("a-z");
      getProducts(search, "name", "asc", currentPage).then((products) => {
        setSortedProducts(products as P[]);
      });
    }
    if (sort === "z-a") {
      setSortStatus("z-a");
      getProducts(search, "name", "desc", currentPage).then((products) => {
        setSortedProducts(products as P[]);
      });
    }
    if (sort === "price-ascending") {
      setSortStatus("price-ascending");
      getProducts(search, "price", "asc", currentPage).then((products) => {
        setSortedProducts(products as P[]);
      });
    }
    if (sort === "price-descending") {
      setSortStatus("price-descending");
      getProducts(search, "price", "desc", currentPage).then((products) => {
        setSortedProducts(products as P[]);
      });
    }
  };

  useEffect(() => {
    getPageCount().then((count) => {
      setTotalPages(count);
    });
  }, []);

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
        <Sort pageText={pageText.sort} sortProducts={sortProducts} />
      </div>
      <div className="products-container">
        {sortedProducts.map((product) => {
          return (
            <Link href={`/store/${product.id}`} key={product.id}>
              <Product
                product={product}
                addToCart={pageText.addToCart as string}
              />
            </Link>
          );
        })}
        {totalPages > 1 && (
          <PageSelector
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </section>
  );
};
export default Products;
