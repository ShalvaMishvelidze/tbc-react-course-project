import { navLinks } from "../utils/constants";
import { NavLink } from "./NavLink";

const Nav = () => {
  return (
    <nav className="navigation">
      {navLinks.map((name) => {
        return <NavLink key={name} name={name} />;
      })}
    </nav>
  );
};

export default Nav;
