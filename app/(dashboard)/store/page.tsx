import { Product, Products as Type } from "@/utils/interfaces";
import { getSystemPreferences } from "@/utils/actions";
import { libraries } from "@/utils/constants";
import Products from "@/components/Products";
import { getSession } from "@auth0/nextjs-auth0";

const page = async () => {
  const { language }: { language: string } = await getSystemPreferences();
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

  const pageText: Type = libraries[language].main.products;

  const session = await getSession();

  return (
    <Products
      pageText={pageText}
      products={products}
      user={session?.user as { sub: string }}
    />
  );
};

export default page;
