import Content from "@/layout/Content";
import Footer from "@/layout/Footer";
import Header from "@/layout/Header";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
