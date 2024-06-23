import { cookies } from "next/headers";
import CartBtn from "./CartBtn";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import Logout from "./Logout";
import SidebarBtn from "./SidebarBtn";
import Link from "next/link";

const Sidebar = ({
  nav,
  lang,
  systemPreferences,
}: {
  nav: { [key: string]: string };
  lang: string[];
  systemPreferences: { language: string; theme: string };
}) => {
  const cookieStore = cookies();
  const cart_total: any = cookieStore.get("cart_total");

  return (
    <>
      <SidebarBtn />
      <aside className="sidebar">
        <div className="sidebar-nav">
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
        </div>
        <div className="sidebar-controls">
          <LanguageSelector
            reload={false}
            lang={lang}
            systemPreferences={systemPreferences}
          />
          <ChangeTheme />
          <CartBtn cart_total={cart_total} />
          <Logout />
        </div>
      </aside>
    </>
  );
};
export default Sidebar;
