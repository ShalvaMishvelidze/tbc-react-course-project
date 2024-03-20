import { Link } from "react-router-dom";

export function NavLink({ name }) {
  return <Link to={name !== "home" ? name : "/"}>{name}</Link>;
}
