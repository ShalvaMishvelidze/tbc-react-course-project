import Product from "../../components/Product";
import { Search } from "../../components/Search";
import Sort from "../../components/Sort";
import Link from "next/link";
import { getProducts, logout } from "../../utils/actions";

const Products = async ({ searchParams }) => {
  const products = await getProducts(searchParams.search);

  return (
    <section className="products">
      <Search />
      <div className="products-header">
        <h2>products</h2>
        <Sort />
      </div>
      <div className="products-container">
        {products.map((product) => {
          return (
            <Link key={product.id} href={`/${product.id}`}>
              <Product product={product} />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Products;
