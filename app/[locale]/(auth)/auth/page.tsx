"use client";
import Toast from "@/components/Toast";
import Content from "@/layout/Content";
import Auth from "@/pages/Auth";
import { unstable_setRequestLocale } from "next-intl/server";

const page = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale);
  return (
    <Content>
      <Toast />
      <Auth />
    </Content>
  );
};
export default page;
