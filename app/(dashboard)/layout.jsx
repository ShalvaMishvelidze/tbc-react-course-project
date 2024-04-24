import Content from "../../layout/Content";
import Footer from "../../layout/Footer";
import Header from "../../layout/Header";
import { getSystemPreferences } from "../../utils/actions";

export default async function layout({ children }) {
  const systemPreferences = await getSystemPreferences();

  return (
    <>
      <Header systemPreferences={systemPreferences} />
      <Content>{children}</Content>
      <Footer systemPreferences={systemPreferences} />
    </>
  );
}
