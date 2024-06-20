import { cookies } from "next/headers";
import CartBtn from "./CartBtn";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import Logout from "./Logout";
import SidebarBtn from "./SidebarBtn";
import Link from "next/link";

const Sidebar = ({
  lang,
  systemPreferences,
}: {
  nav: { [key: string]: string }[];
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
            Home
          </Link>
          <Link className="nav-link" href={"/store"}>
            Store
          </Link>
          <Link className="nav-link" href={"/blog"}>
            Blog
          </Link>
          <Link className="nav-link" href={"/premium"}>
            Premium
          </Link>
          <Link className="nav-link" href={"/contact"}>
            Contact
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
