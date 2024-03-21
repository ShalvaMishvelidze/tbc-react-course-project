import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./layout/Content";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./pages/About";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import Premium from "./pages/Premium";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Content>
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/premium" element={<Premium />} />
            </Route>
            <Route path="*" element={<Error />} />
          </Routes>
        </Content>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
