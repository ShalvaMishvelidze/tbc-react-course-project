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
        <NavLink text={t("gallery")} href="/gallery" />
        <NavLink text={t("map")} href="/map" />
        <NavLink text={t("trips")} href="/trips" />
        <NavLink text={t("profile")} href="/profile" />
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
