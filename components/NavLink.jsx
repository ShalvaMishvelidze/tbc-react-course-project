import Link from "next/link";

export function NavLink({ name }) {
  return <Link href={name !== "home" ? "/" + name : "/"}>{name}</Link>;
}
