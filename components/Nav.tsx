import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import { getCartTotalCookie } from "@/utils/actions/cart_actions";
import CartBtn from "./CartBtn";
import User from "./User";
import Link from "next/link";

const Nav = async ({
  nav,
  lang,
  systemPreferences,
}: {
  nav: { [key: string]: string };
  lang: string[];
  systemPreferences: { language: string; theme: string };
}) => {
  const total = await getCartTotalCookie();

  return (
    <nav className="navigation">
      <div className="navigation-left">
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
      <div className="navigation-right">
        <LanguageSelector
          reload={false}
          lang={lang}
          systemPreferences={systemPreferences}
        />
        <CartBtn cart_total={total} />
        <ChangeTheme />
        <User nav={nav} />
      </div>
    </nav>
  );
};

export default Nav;
