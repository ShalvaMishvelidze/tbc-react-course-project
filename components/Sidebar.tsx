import { cookies } from "next/headers";
import CartBtn from "./CartBtn";
// import { NavLink } from "./NavLink";
// import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import Logout from "./Logout";
import SidebarBtn from "./SidebarBtn";

const Sidebar = () =>
  //   {
  //   nav,
  //   lang,
  //   systemPreferences,
  // }: {
  //   nav: { [key: string]: string }[];
  //   lang: string[];
  //   systemPreferences: { language: string; theme: string };
  // }
  {
    const cookieStore = cookies();
    const cart_total: any = cookieStore.get("cart_total");

    return (
      <>
        <SidebarBtn />
        <aside className="sidebar">
          {/* <div className="sidebar-nav">
          {nav.map((link) => {
            return (
              <NavLink key={link.text} text={link.text} href={link.href} />
            );
          })}
        </div> */}
          <div className="sidebar-controls">
            {/* <LanguageSelector
            reload={false}
            lang={lang}
            systemPreferences={systemPreferences}
          /> */}
            <ChangeTheme />
            <CartBtn cart_total={cart_total} />
            <Logout />
          </div>
        </aside>
      </>
    );
  };
export default Sidebar;
