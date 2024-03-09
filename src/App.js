import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <nav className="navigation">
          <ul>
            <a href="#">
              <li>home</li>
            </a>
            <a href="#">
              <li>about</li>
            </a>
            <a href="#">
              <li>products</li>
            </a>
            <a href="#">
              <li>stuff</li>
            </a>
          </ul>
        </nav>
        <div className="header-content">
          <h1 className="header-content-heading">
            header content will be here
          </h1>
        </div>
      </header>
      <main className="content">
        <h1>landing page main content will be here</h1>
      </main>
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
    </div>
  );
}

export default App;
