import { useTranslations } from "next-intl";

const Home = () => {
  const t = useTranslations("Index");
  return <div>{t("title")}</div>;
};
export default Home;
