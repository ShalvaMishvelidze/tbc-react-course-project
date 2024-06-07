import { Link } from "@/navigation";
import Product from "./Product";
// import { Search } from "./Search";
// import { ChangeEvent, useEffect, useState } from "react";
// import Sort from "./Sort";
// import { Product as P, Products as Type } from "../utils/constants";

const Products = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/products/getProducts`
  );
  const data = await response.json();
  const products = data.data;

  // if (!sortedProducts) {
  //   return (
  //     <div className="products loading">
  //       <div className="search"></div>
  //       <div className="products-header">
  //         <div className="products-header-title"></div>
  //         <div className="sort"></div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <section className="products">
      {/* <Search pageText={pageText.search} /> */}
      <div className="products-header">
        {/* <h2 className="products-header-title">{pageText.heading as string}</h2> */}
        {/* <Sort
          pageText={pageText.sort}
          handleChange={handleChange}
          sortProducts={sortProducts}
        /> */}
      </div>
      <div className="products-container">
        {products.map((product: any) => {
          return (
            <Link href={`/store/${product.id}`} key={product.id}>
              <Product product={product} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};
export default Products;
