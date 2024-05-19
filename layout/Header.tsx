import Sidebar from "@/components/Sidebar";
import Nav from "../components/Nav";
import { getSystemPreferences } from "../utils/actions";
import { libraries } from "../utils/constants";

const Header = async () => {
  const systemPreferences = await getSystemPreferences();
  const nav: { [key: string]: string }[] =
    libraries[systemPreferences.language].header.nav;
  const lang = libraries[systemPreferences.language].header.lang;

  return (
    <header className="header">
      <Nav nav={nav} lang={lang} systemPreferences={systemPreferences} />
      <Sidebar nav={nav} lang={lang} systemPreferences={systemPreferences} />
    </header>
  );
};

export default Header;
