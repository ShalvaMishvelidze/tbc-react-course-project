import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">
        <span className="copyright">&copy; all rights reserved</span>
        <a href="#" className="terms">
          terms and conditions
        </a>
        <a href="#" className="privacy-policy">
          privacy policy
        </a>
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
