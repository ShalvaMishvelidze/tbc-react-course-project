import StoreHeader from "@/components/StoreHeader";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <section className="store">
      <StoreHeader />
    </section>
  );
};

export default page;
