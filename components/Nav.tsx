import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import ChangeTheme from "./ChangeTheme";
import User from "./User";
import { Link } from "@/navigation";

const Nav = () => {
  const t = useTranslations("nav");

  return (
    <nav className="navigation">
      <div className="navigation-left">
        <Link className="nav-link" href="/">
          {t("home")}
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
      <div className="navigation-right">
        <LanguageSelector />
        <ChangeTheme />
        <User />
      </div>
    </nav>
  );
};

export default Nav;
