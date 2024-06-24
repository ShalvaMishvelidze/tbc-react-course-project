import { getSystemPreferences } from "@/utils/actions";
import Content from "../layout/Content";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import Home from "@/components/Home";
import { libraries } from "@/utils/constants";

const page = async () => {
  const { language } = await getSystemPreferences();
  const text = libraries[language].main.home;
  return (
    <>
      <Header />
      <Content>
        <Home text={text} />
      </Content>
      <Footer />
    </>
  );
};

export default page;
