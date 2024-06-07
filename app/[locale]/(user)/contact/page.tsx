import Contact from "@/pages/Contact";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <Contact />;
};
export default page;
