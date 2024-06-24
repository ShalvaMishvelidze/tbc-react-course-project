import Link from "next/link";
import { TbWorld } from "react-icons/tb";
import { IoCompassOutline } from "react-icons/io5";
import { IoSubwaySharp } from "react-icons/io5";
import { MdHealthAndSafety } from "react-icons/md";

const Home = () => {
  return (
    <>
      <section className="home-header">
        <div className="home-header-container">
          <div className="home-header-title">
            <span>outdoors</span>
            <span>is where life happens</span>
          </div>
          <Link href="/premium" className="home-header-btn">
            Discover our travel plans
          </Link>
        </div>
      </section>
      <h1 className="home-heading">EXCITING TOURS FOR ADVENTUROUS PEOPLE</h1>
      <section className="home-features">
        <div className="feature">
          <div className="icon">
            <TbWorld />
          </div>
          <h3 className="feature-heading">Explore the world</h3>
          <p className="feature-text">
            Explore the world with our curated travel guides, uncover hidden
            gems, and embark on unforgettable adventures. Whether you seek
            serene landscapes, vibrant cityscapes, or cultural experiences, our
            resources will inspire your next journey. Let us help you create
            lasting memories and discover the beauty that awaits.
          </p>
        </div>
        <div className="feature">
          <div className="icon">
            <IoCompassOutline />
          </div>
          <h3 className="feature-heading">Meet nature</h3>
          <p className="feature-text">
            Meet nature and reconnect with the great outdoors. Discover
            breathtaking landscapes, serene forests, and diverse wildlife. Our
            guides and tips will help you explore and appreciate the natural
            world, fostering a deeper connection with the environment. Embrace
            the beauty and tranquility that nature offers.
          </p>
        </div>
        <div className="feature">
          <div className="icon">
            <IoSubwaySharp />
          </div>
          <h3 className="feature-heading">Find your way</h3>
          <p className="feature-text">
            Find your way and navigate life's journey with confidence. Our
            resources and guides offer insights, tips, and inspiration to help
            you achieve your goals and dreams. Whether you're seeking direction
            in your career, personal growth, or travel adventures, let us be
            your trusted companion on the path to success.
          </p>
        </div>
        <div className="feature">
          <div className="icon">
            <MdHealthAndSafety />
          </div>
          <h3 className="feature-heading">live healthier life</h3>
          <p className="feature-text">
            Live a healthier life with our expert advice and practical tips.
            Discover nutritious recipes, effective workout routines, and
            wellness strategies to enhance your physical and mental well-being.
            Embrace a balanced lifestyle and make positive changes that lead to
            a happier, healthier you. Start your journey to better health today.
          </p>
        </div>
      </section>
    </>
  );
};
export default Home;
