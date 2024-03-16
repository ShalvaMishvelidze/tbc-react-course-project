import { navLinks } from "../utils/constants";
import { NavLink } from "./NavLink";

const Nav = () => {
  return (
    <nav className="navigation">
      <ul>
        {navLinks.map((name) => {
          return <NavLink name={name} />;
        })}
      </ul>
    </nav>
  );
};

export default Nav;
