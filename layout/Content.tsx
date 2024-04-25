import { ReactNode } from "react";

const Content = ({ children }: { children: ReactNode }) => {
  return <main className="content">{children}</main>;
};

export default Content;
