import { BrowserRouter, Route, Routes } from "react-router-dom";
import Content from "./layout/Content";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import About from "./pages/About";
import Products from "./pages/Products";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Content>
          <Routes>
            <Route path="/">
              <Route index element={<Products />} />
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Home />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/premium" element={<Premium />} />
              <Route path="/profile" element={<Profile />} />
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
