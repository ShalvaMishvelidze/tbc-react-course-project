"use client";
import Toast from "@/components/Toast";
import Content from "@/layout/Content";
import Auth from "@/pages/Auth";

const page = () => {
  return (
    <Content>
      <Toast />
      <Auth />
    </Content>
  );
};
export default page;
