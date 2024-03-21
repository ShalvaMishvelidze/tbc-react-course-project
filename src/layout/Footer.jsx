import React from "react";
import { navLinks } from "../utils/constants";
import { NavLink } from "../components/NavLink";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="copyright">
          &copy; all rights reserved {new Date().getFullYear()}
        </span>
        <a href="#root" className="terms">
          terms and conditions
        </a>
        <a href="#root" className="privacy-policy">
          privacy policy
        </a>
        {navLinks.map((name) => {
          return <NavLink key={name} name={name} />;
        })}
      </div>
      <div className="footer-right">
        <form className="newsletter">
          <input type="email" placeholder="Subscribe to out newsletter!" />
          <button type="submit">subscribe</button>
        </form>
      </div>
    </footer>
  );
};

export default Footer;
