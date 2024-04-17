import { Blog } from "../../../components/Blog";
import { getPosts } from "../../../utils/actions";

const Blogs = async () => {
  const posts = await getPosts();

  return (
    <section className="blogs">
      {posts.map((post) => {
        return <Blog key={post.id} post={post} />;
      })}
    </section>
  );
};

export default Blogs;
