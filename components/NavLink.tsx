import { Link } from "@/navigation";

export function NavLink({ text, href }: { text: string; href: string }) {
  return (
    <Link className="nav-link" href={href}>
      {text}
    </Link>
  );
}
