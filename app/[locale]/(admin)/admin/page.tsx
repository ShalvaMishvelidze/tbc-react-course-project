import { unstable_setRequestLocale } from "next-intl/server";
import Admin from "@/pages/Admin";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <Admin />;
};
export default page;
