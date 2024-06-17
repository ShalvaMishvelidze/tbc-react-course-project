import { getSystemPreferences } from "../utils/actions";
import Products from "../components/Products";
import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { libraries } from "../utils/constants";
import { Products as Type } from "@/utils/interfaces";
import { getProducts } from "@/utils/actions/products_actions";

const page = async () =>
  // { searchParams }: { searchParams: { search: string } }
  {
    const { language }: { language: string } = await getSystemPreferences();
    const products: any = await getProducts("", "", "", 1);
    // searchParams.search
    const pageText: Type = libraries[language].main.products;

    return (
      <>
        <Header />
        <Content>
          <Products pageText={pageText} products={products} />
        </Content>
        <Footer />
      </>
    );
  };

export default page;
