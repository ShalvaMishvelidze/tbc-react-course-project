import Logout from "./Logout";
import { navLinks } from "../utils/constants";
import { NavLink } from "./NavLink";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";

const Nav = () => {
  return (
    <nav className="navigation">
      <div className="navigation-left">
        {navLinks.map((name) => {
          return <NavLink key={name} name={name} />;
        })}
      </div>
      <div className="navigation-right">
        <LanguageSelector />
        <ChangeTheme />
        <Logout />
      </div>
    </nav>
  );
};

export default Nav;
