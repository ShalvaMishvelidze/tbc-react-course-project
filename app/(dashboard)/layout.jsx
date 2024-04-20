import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Content from "../../layout/Content";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";

export default function layout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/login");
  }

  return (
    <>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </>
  );
}
