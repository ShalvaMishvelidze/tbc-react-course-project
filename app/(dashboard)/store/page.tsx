import { Product, Products as Type } from "@/utils/interfaces";
import { getSystemPreferences } from "@/utils/actions";
import { libraries } from "@/utils/constants";
import Products from "@/components/Products";
import LoadingSpinner from "@/components/LoadingSpinner";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();

  if (!language) {
    return <LoadingSpinner />;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/product/products`,
    {
      method: "POST",
      body: JSON.stringify({
        search: "",
        category: "",
        sort: "",
        order: "",
        page: 1,
      }),
    }
  );
  const products: Product[] = await response.json();

  if (!products) {
    return <LoadingSpinner />;
  }

  const pageText: Type = libraries[language].main.products;

  if (!pageText) {
    return <LoadingSpinner />;
  }

  return <Products pageText={pageText} products={products} />;
};

export default page;
