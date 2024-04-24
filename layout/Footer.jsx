import React from "react";
import { libraries } from "../utils/constants";
import { NavLink } from "../components/NavLink";
import { getSystemPreferences } from "../utils/actions";

const Footer = async () => {
  const systemPreferences = await getSystemPreferences();
  const footer = await libraries[systemPreferences.language].footer;

  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="copyright">
          &copy; {footer.copy} {new Date().getFullYear()}
        </span>
        <a href="#root" className="terms">
          {footer.terms}
        </a>
        <a href="#root" className="privacy-policy">
          {footer.privacy}
        </a>
        {footer.nav.map((link) => {
          return <NavLink key={link.text} text={link.text} href={link.href} />;
        })}
      </div>
      <div className="footer-right">
        <form className="newsletter">
          <input type="email" placeholder={footer.newsletter + "!"} />
          <button type="submit">{footer.subscribe}</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
