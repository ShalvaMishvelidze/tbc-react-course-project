import Tours from "@/pages/Tours";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <Tours />;
};
export default page;
