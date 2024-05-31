import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import { NavLink } from "./NavLink";
import ChangeTheme from "./ChangeTheme";
import User from "./User";

const Nav = () => {
  const t = useTranslations("nav");

  return (
    <nav className="navigation">
      <div className="navigation-left">
        <NavLink text={t("home")} href="/" />
        <NavLink text={t("tours")} href="/tours" />
        <NavLink text={t("map")} href="/map" />
        <NavLink text={t("blog")} href="/blog" />
        <NavLink text={t("profile")} href="/profile" />
        <NavLink text={t("contact")} href="/contact" />
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
