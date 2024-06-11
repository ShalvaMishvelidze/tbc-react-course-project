import { NavLink } from "./NavLink";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import { getCartTotalCookie } from "@/utils/actions/cart_actions";
import CartBtn from "./CartBtn";
import { getSession } from "@auth0/nextjs-auth0";

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
  const session = await getSession();
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
        {session?.user ? (
          <a href="/api/auth/logout">logout</a>
        ) : (
          <a href="/api/auth/login">login</a>
        )}
      </div>
    </nav>
  );
};

export default Nav;
