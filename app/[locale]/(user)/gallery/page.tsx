import Gallery from "@/pages/Gallery";
// import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { unstable_setRequestLocale } from "next-intl/server";

//  withPageAuthRequired(
export default async function page({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return <Gallery />;
}
//   ,
//   { returnTo: "/gallery" }
// );
