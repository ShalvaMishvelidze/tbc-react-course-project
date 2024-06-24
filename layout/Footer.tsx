import { libraries } from "../utils/constants";
import { getSystemPreferences } from "../utils/actions";
import Link from "next/link";

const Footer = async () => {
  const systemPreferences = await getSystemPreferences();
  const footer = libraries[systemPreferences.language].footer;

  return (
    <footer className="footer">
      <div className="footer-left">
        <div className="footer-left-top">
          <span className="copyright">
            &copy; {footer.copy} {new Date().getFullYear()}
          </span>
          <a href="#root" className="terms">
            {footer.terms}
          </a>
          <a href="#root" className="privacy-policy">
            {footer.privacy}
          </a>
        </div>
        <div className="footer-left-bottom">
          <Link className="nav-link" href={"/"}>
            {footer.nav.home}
          </Link>
          <Link className="nav-link" href={"/store"}>
            {footer.nav.store}
          </Link>
          <Link className="nav-link" href={"/blog"}>
            {footer.nav.blog}
          </Link>
          <Link className="nav-link" href={"/premium"}>
            {footer.nav.tours}
          </Link>
          <Link className="nav-link" href={"/contact"}>
            {footer.nav.contact}
          </Link>
        </div>
      </div>
      <div className="footer-right">
        <form className="newsletter">
          <input
            type="email"
            placeholder={footer.newsletter + "!"}
            name="from_name"
            id="from_name"
          />
          <button type="submit">{footer.subscribe}</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
