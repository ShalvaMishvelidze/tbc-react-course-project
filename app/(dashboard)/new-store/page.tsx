import { getProducts } from "@/utils/actions";

const page = async () => {
  const products = await getProducts();
  console.log(products);

  return <div>new store</div>;
};
export default page;
