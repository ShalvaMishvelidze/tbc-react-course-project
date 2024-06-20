import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Home from "@/components/Home";

const page = async () => {
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
