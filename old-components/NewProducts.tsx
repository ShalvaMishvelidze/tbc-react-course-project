"use client";
import { useEffect, useState } from "react";
import { Product as P, Products as Type } from "@/utils/interfaces";
import Toast from "./Toast";
import NewSearch from "./NewSearch";
import NewSort from "./NewSort";
import NewProduct from "./NewProduct";
import NewPagination from "./NewPagination";
import { fetchProducts } from "@/utils/client_actions";
import CategoriesSelect from "./CategoriesSelect";
import ProductsLoading from "./ProductsLoading";

export const revalidate = 0;

const Products = ({ pageText }: { pageText: Type }) => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("name");
  const [order, setOrder] = useState("asc");
  const [page, setPage] = useState(1);

  const [products, setProducts] = useState<P[] | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(1);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    fetchProducts(search, category, sort, order, page).then((data) => {
      setProducts(data.products);
      setTotalPages(data.totalPages);
      setCategories(data.categories);
    });
  }, [search, category, sort, order, page]);

  if (!products) {
    return <ProductsLoading />;
  }

  return (
    <section className="products">
      <Toast />
      <form className="search">
        <NewSearch setSearch={setSearch} pageText={pageText.search} />
        <div className="products-header">
          <h2 className="products-header-title">
            {pageText.heading as string}
          </h2>
          <CategoriesSelect
            categories={categories}
            pageText={pageText}
            category={category}
            setCategory={setCategory}
          />
          <NewSort
            setOrder={setOrder}
            pageText={pageText.sort}
            setSort={setSort}
          />
        </div>
      </form>
      <div className="products-container">
        {products.map((product) => {
          return (
            <NewProduct
              key={product.id}
              product={product}
              addToCart={pageText.addToCart as string}
              seeMore={pageText.seeMore as string}
            />
          );
        })}
      </div>
      {totalPages > 1 && (
        <NewPagination page={page} totalPages={totalPages} setPage={setPage} />
      )}
    </section>
  );
};
export default Products;
