import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import User from "./User";
import { Link } from "@/navigation";
import CartBtn from "./CartBtn";
import { getCartTotalCookie } from "@/utils/cart_actions";

const Nav = async () => {
  const t = useTranslations("nav");
  const cart_total = await getCartTotalCookie();

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="nav-link" href="/">
          {t("home")}
        </Link>
        <Link className="nav-link" href="/store">
          {t("store")}
        </Link>
        <Link className="nav-link" href="/tours">
          {t("tours")}
        </Link>
        <Link className="nav-link" href="/map">
          {t("map")}
        </Link>
        <Link className="nav-link" href="/blog">
          {t("blog")}
        </Link>
        <Link className="nav-link" href="/profile">
          {t("profile")}
        </Link>
        <Link className="nav-link" href="/contact">
          {t("contact")}
        </Link>
      </div>
      <div className="nav-right">
        <LanguageSelector />
        <CartBtn cart_total={cart_total} />
        <ChangeTheme />
        <User />
      </div>
    </nav>
  );
};

export default Nav;
