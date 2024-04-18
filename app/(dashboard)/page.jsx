import { getProducts } from "../../utils/actions";
import Products from "../../components/Products";

const page = async ({ searchParams }) => {
  const products = await getProducts(searchParams.search);

  return <Products products={products} />;
};

export default page;
