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
      {/* <div className="header-content">
        <h1 className="header-content-heading">header content will be here</h1>
      </div> */}
    </header>
  );
};

export default Header;
