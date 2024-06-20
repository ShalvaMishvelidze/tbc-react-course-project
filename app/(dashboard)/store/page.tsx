import { Products as Type } from "@/utils/interfaces";
import { getProducts } from "@/utils/actions/products_actions";
import { getSystemPreferences } from "@/utils/actions";
import { libraries } from "@/utils/constants";
import Products from "@/components/Products";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();
  const products: any = await getProducts("", "", "", 1);
  const pageText: Type = libraries[language].main.products;

  return <Products pageText={pageText} products={products} />;
};

export default page;
