import { ReactNode } from "react";
import Content from "../../layout/Content";

export default function layout({ children }: { children: ReactNode }) {
  return <Content>{children}</Content>;
}
