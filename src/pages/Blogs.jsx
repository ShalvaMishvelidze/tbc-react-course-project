import { Blog } from "../components/Blog";
import { blogs } from "../utils/constants";

const Blogs = () => {
  return (
    <section className="blogs">
      {blogs.map((blog, index) => {
        return <Blog key={index} blog={blog} />;
      })}
    </section>
  );
};

export default Blogs;
