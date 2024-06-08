import { NavLink } from "./NavLink";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import { getCartTotalCookie } from "@/utils/actions/cart_actions";
import CartBtn from "./CartBtn";

const Nav = async ({
  nav,
  lang,
  systemPreferences,
}: {
  nav: { [key: string]: string }[];
  lang: string[];
  systemPreferences: { language: string; theme: string };
}) => {
  const total = await getCartTotalCookie();
  return (
    <nav className="navigation">
      <div className="navigation-left">
        {nav.map((link) => {
          return <NavLink key={link.text} text={link.text} href={link.href} />;
        })}
      </div>
      <div className="navigation-right">
        <CartBtn cart_total={total} />
        <LanguageSelector
          reload={false}
          lang={lang}
          systemPreferences={systemPreferences}
        />
        <ChangeTheme />
        <a href="/api/auth/logout">logout</a>
        <a href="/api/auth/login">login</a>
      </div>
    </nav>
  );
};

export default Nav;
