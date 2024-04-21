import Content from "../../layout/Content";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

export default function layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
