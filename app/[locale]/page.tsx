import Home from "@/pages/Home";
import { unstable_setRequestLocale } from "next-intl/server";

const page = async ({ params: { locale } }: { params: { locale: any } }) => {
  unstable_setRequestLocale(locale);
  return <Home />;
};

export default page;
