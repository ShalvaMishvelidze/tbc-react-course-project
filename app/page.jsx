import { getProducts, getSystemPreferences } from "../utils/actions";
import Products from "../components/Products";
import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import { libraries } from "../utils/constants";

const page = async ({ searchParams }) => {
  const systemPreferences = await getSystemPreferences();
  const products = await getProducts(searchParams.search);
  const pageText = await libraries[systemPreferences.language].main.products;

  return (
    <>
      <Header systemPreferences={systemPreferences} />
      <Content>
        <Products pageText={pageText} products={products} />
      </Content>
      <Footer systemPreferences={systemPreferences} />
    </>
  );
};

export default page;
