import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Content from "../../layout/Content";

export default function layout({ children }) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (token) {
    redirect("/");
  }

  return <Content>{children}</Content>;
}
