import { Link } from "@/navigation";
import { useTranslations } from "next-intl";

const Footer = () => {
  const t = useTranslations("footer");
  const t1 = useTranslations("nav");

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-left-top">
          <span className="copyright">
            &copy; {t("copy")} {new Date().getFullYear()}
          </span>
          <a href="#root" className="terms">
            {t("terms")}
          </a>
          <a href="#root" className="privacy-policy">
            {t("privacy")}
          </a>
        </div>
        <div className="footer-left-bottom">
          <Link className="nav-link" href="/">
            {t1("home")}
          </Link>
          <Link className="nav-link" href="/store">
            {t1("store")}
          </Link>
          <Link className="nav-link" href="/tours">
            {t1("tours")}
          </Link>
          <Link className="nav-link" href="/map">
            {t1("map")}
          </Link>
          <Link className="nav-link" href="/blog">
            {t1("blog")}
          </Link>
          <Link className="nav-link" href="/profile">
            {t1("profile")}
          </Link>
          <Link className="nav-link" href="/contact">
            {t1("contact")}
          </Link>
        </div>
      </div>
      <div className="footer-right">
        <form className="newsletter">
          <input type="email" placeholder={t("placeholder") + "!"} />
          <button type="submit">{t("subscribe")}</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
