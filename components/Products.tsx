"use client";
import Product from "./Product";
import { Search } from "./Search";
import { useEffect, useState } from "react";
import Sort from "./Sort";
import { Product as P, Products as Type } from "@/utils/interfaces";
import PageSelector from "./PageSelector";
import { useSearchParams } from "next/navigation";
import { useUser } from "@auth0/nextjs-auth0/client";
import Toast from "./Toast";

export const revalidate = 0;

const Products = ({
  products: p,
  pageText,
}: {
  products: P[];
  pageText: Type;
}) => {
  const { user, error, isLoading } = useUser();
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<P[] | undefined>(undefined);
  const [sortStatus, setSortStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState<string>("all");
  const [categories, setCategories] = useState<string[]>([]);
  const searchParams = useSearchParams();
  const searchString = searchParams.get("search");

  const getProducts = async (
    searchString: string,
    categoryString: string,
    sortString: string,
    orderString: string,
    page: number
  ) => {
    const response = await fetch("/api/product/products", {
      method: "POST",
      body: JSON.stringify({
        search: searchString,
        category: categoryString,
        sort: sortString,
        order: orderString,
        page: page,
      }),
    });
    const data: P[] = (await response.json()) as P[];
    setProducts(data);
  };

  useEffect(() => {
    if (searchString) {
      setCurrentPage(1);
      setSearch(searchString);
    } else {
      setSearch("");
    }
  }, [searchString]);

  useEffect(() => {
    getProducts(
      search,
      category === "all" ? "" : category,
      "",
      "",
      currentPage
    );
  }, [search, currentPage, category]);

  useEffect(() => {
    const getPages = async () => {
      const res = await fetch("/api/product/page-count", {
        method: "POST",
        body: JSON.stringify({ search, category }),
      });
      const data = await res.json();
      console.log(data);

      setTotalPages(data.pages);
    };
    getPages();
  }, [search, category]);

  useEffect(() => {
    setProducts([...p]);
    const getInfo = async () => {
      const response = await fetch("/api/product/categories");
      const data1 = await response.json();
      const categories = data1.map((category: { category: string }) => {
        return category.category;
      });
      setCategories(["all", ...categories]);
      const res = await fetch("/api/product/page-count", {
        method: "POST",
        body: JSON.stringify({ search: "", category: "" }),
      });
      const data = await res.json();
      setTotalPages(data.pages);
    };
    getInfo();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const sortProducts = (sort: string) => {
    if (sortStatus === sort) {
      setSortStatus("");
      getProducts(
        search,
        category === "all" ? "" : category,
        "",
        "",
        currentPage
      );
      return;
    }

    if (sort === "a-z") {
      setSortStatus("a-z");
      getProducts(
        search,
        category === "all" ? "" : category,
        "name",
        "asc",
        currentPage
      );
      return;
    }
    if (sort === "z-a") {
      setSortStatus("z-a");
      getProducts(
        search,
        category === "all" ? "" : category,
        "name",
        "desc",
        currentPage
      );
      return;
    }
    if (sort === "price-ascending") {
      setSortStatus("price-ascending");
      getProducts(
        search,
        category === "all" ? "" : category,
        "price",
        "asc",
        currentPage
      );
      return;
    }
    if (sort === "price-descending") {
      setSortStatus("price-descending");
      getProducts(
        search,
        category === "all" ? "" : category,
        "price",
        "desc",
        currentPage
      );
      return;
    }
  };

  if (!products || isLoading || error) {
    return (
      <div className="products loading">
        <div className="search" />
        <div className="products-header">
          <div className="products-header-title" />
          <div className="categories" />
          <div className="sort" />
        </div>
      </div>
    );
  }

  return (
    <section className="products">
      <Toast />
      <Search pageText={pageText.search} />
      <div className="products-header">
        <h2 className="products-header-title">{pageText.heading as string}</h2>
        {categories.length !== 0 && (
          <div className="products-categories">
            <h3>{pageText.categories}:</h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((c) => {
                return (
                  <option key={c} value={c}>
                    {c}
                  </option>
                );
              })}
            </select>
          </div>
        )}
        <Sort pageText={pageText.sort} sortProducts={sortProducts} />
      </div>
      <div className="products-container">
        {products.map((product) => {
          return (
            <Product
              key={product.id}
              product={product}
              addToCart={pageText.addToCart as string}
              seeMore={pageText.seeMore as string}
              user={user}
            />
          );
        })}
      </div>
      {totalPages > 1 && (
        <PageSelector
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </section>
  );
};
export default Products;
