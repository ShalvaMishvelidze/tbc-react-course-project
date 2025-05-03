import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";

const page = async () => {
  return (
    <>
      <Header />
      <Content>content goes here</Content>
      <Footer />
    </>
  );
};

export default page;
