import { ReactNode } from "react";
import Content from "../../layout/Content";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

export default async function layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
