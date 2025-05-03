import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { IoCompassOutline } from "react-icons/io5";
import { IoSubwaySharp } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";

const Home = ({ text }: any) => {
  return (
    <>
      <section className="home-header">
        <div className="home-header-container">
          <div className="home-header-title">
            <span>{text.head.title}</span>
            <span>{text.head.sub}</span>
          </div>
          <Link href="/premium" className="home-header-btn">
            {text.head.btn}
          </Link>
        </div>
      </section>
      <h1 className="home-heading">{text.head.heading}</h1>
      <section className="home-features">
        <div className="feature">
          <div className="icon">
            <TbWorld />
          </div>
          <h3 className="feature-heading">{text.world.title}</h3>
          <p className="feature-text">{text.world.desc}</p>
        </div>
        <div className="feature">
          <div className="icon">
            <IoCompassOutline />
          </div>
          <h3 className="feature-heading">{text.nature.title}</h3>
          <p className="feature-text">{text.nature.desc}</p>
        </div>
        <div className="feature">
          <div className="icon">
            <IoSubwaySharp />
          </div>
          <h3 className="feature-heading">{text.way.title}</h3>
          <p className="feature-text">{text.way.desc}</p>
        </div>
        <div className="feature">
          <div className="icon">
            <MdHealthAndSafety />
          </div>
          <h3 className="feature-heading">{text.life.title}</h3>
          <p className="feature-text">{text.life.desc}</p>
        </div>
      </section>
      <Link href="/products" className="home-btn">
        {text.head.link}
      </Link>
    </>
  );
};
export default Home;
