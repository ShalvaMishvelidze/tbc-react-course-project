import Map from "@/pages/Map";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return <Map />;
};
export default page;
