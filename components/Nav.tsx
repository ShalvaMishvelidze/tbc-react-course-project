import { useTranslations } from "next-intl";
import LanguageSelector from "./LanguageSelector";
import { NavLink } from "./NavLink";
// import Logout from "./Logout";
// import ChangeTheme from "./ChangeTheme";

const Nav = () => {
  const t = useTranslations("nav");

  return (
    <nav className="navigation">
      <div className="navigation-left">
        <NavLink text={t("home")} href="/" />
        <NavLink text={t("gallery")} href="/gallery" />
        <NavLink text={t("map")} href="/map" />
        <NavLink text={t("trips")} href="/trips" />
      </div>
      <div className="navigation-right">
        <LanguageSelector />
        {/* <ChangeTheme />
        <Logout /> */}{" "}
      </div>
    </nav>
  );
};

export default Nav;
