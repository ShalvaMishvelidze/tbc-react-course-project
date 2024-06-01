import Content from "@/layout/Content";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import Home from "@/pages/Home";
import { unstable_setRequestLocale } from "next-intl/server";

const page = async ({ params: { locale } }: { params: { locale: any } }) => {
  unstable_setRequestLocale(locale);
  return (
    <>
      <Header />
      <Content>
        <Home />
      </Content>
      <Footer />
    </>
  );
};

export default page;
