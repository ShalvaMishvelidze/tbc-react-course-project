import Link from "next/link";

export function NavLink({ text, href }) {
  return (
    <Link className="nav-link" href={href}>
      {text}
    </Link>
  );
}
