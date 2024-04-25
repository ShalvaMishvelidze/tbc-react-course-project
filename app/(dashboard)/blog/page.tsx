import { Blog } from "../../../components/Blog";
import { getPosts } from "../../../utils/actions";

interface Post {
  id: string;
  title: string;
  body: string;
  reactions: number;
  tags: string[];
  userId: number;
}

const Blogs = async () => {
  const posts: Post[] = await getPosts();

  return (
    <section className="blogs">
      {posts.map((post) => {
        return <Blog key={post.id} post={post} />;
      })}
    </section>
  );
};

export default Blogs;
