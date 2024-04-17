import { logout } from "../utils/actions";
import { navLinks } from "../utils/constants";
import { NavLink } from "./NavLink";

const Nav = () => {
  return (
    <nav className="navigation">
      {navLinks.map((name) => {
        return <NavLink key={name} name={name} />;
      })}
      <form action={logout}>
        <button type="submit">log out</button>
      </form>
    </nav>
  );
};

export default Nav;
