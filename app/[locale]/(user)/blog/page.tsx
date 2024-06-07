import Blog from "@/pages/Blog";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <Blog />;
};
export default page;
