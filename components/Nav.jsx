import Logout from "./Logout";
import { NavLink } from "./NavLink";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";

const Nav = ({ nav, lang, systemPreferences }) => {
  return (
    <nav className="navigation">
      <div className="navigation-left">
        {nav.map((link) => {
          return <NavLink key={link.text} text={link.text} href={link.href} />;
        })}
      </div>
      <div className="navigation-right">
        <LanguageSelector lang={lang} systemPreferences={systemPreferences} />
        <ChangeTheme />
        <Logout />
      </div>
    </nav>
  );
};

export default Nav;
