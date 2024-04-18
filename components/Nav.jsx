import Logout from "./Logout";
import { navLinks } from "../utils/constants";
import { NavLink } from "./NavLink";

const Nav = () => {
  return (
    <nav className="navigation">
      {navLinks.map((name) => {
        return <NavLink key={name} name={name} />;
      })}
      <Logout />
    </nav>
  );
};

export default Nav;
