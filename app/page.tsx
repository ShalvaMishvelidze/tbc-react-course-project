import { getProducts, getSystemPreferences } from "../utils/actions";
import Products from "../components/Products";
import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { Product, Products as Type, libraries } from "../utils/constants";

const page = async () =>
  // { searchParams }: { searchParams: { search: string } }
  {
    const { language }: { language: string } = await getSystemPreferences();
    const products: Product[] = await getProducts();
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
