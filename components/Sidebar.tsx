import SidebarBtn from "./SidebarBtn";
import Link from "next/link";

const Sidebar = ({ nav }: { nav: { [key: string]: string } }) => {
  return (
    <>
      <SidebarBtn />
      <aside className="sidebar">
        <Link className="nav-link" href={"/"}>
          {nav.home}
        </Link>
        <Link className="nav-link" href={"/store"}>
          {nav.store}
        </Link>
        <Link className="nav-link" href={"/blog"}>
          {nav.blog}
        </Link>
        <Link className="nav-link" href={"/premium"}>
          {nav.tours}
        </Link>
        <Link className="nav-link" href={"/contact"}>
          {nav.contact}
        </Link>
      </aside>
    </>
  );
};
export default Sidebar;
