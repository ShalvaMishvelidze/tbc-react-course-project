import Link from "next/link";

export function NavLink({ name }) {
  return (
    <Link className="nav-link" href={name !== "home" ? "/" + name : "/"}>
      {name}
    </Link>
  );
}
