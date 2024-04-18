import { getProducts } from "../utils/actions";
import Products from "../components/Products";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const page = async ({ searchParams }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  const products = await getProducts(searchParams.search);

  return (
    <>
      <Header />
      <Content>
        <Products products={products} />
      </Content>
      <Footer />
    </>
  );
};

export default page;
