import { getAllPosts } from "@/utils/actions/blog_actions";
import { Blog } from "../../../components/Blog";
import { Post } from "@/utils/interfaces";

const Blogs = async () => {
  const posts: Post[] = (await getAllPosts()) as Post[];

  return (
    <section className="blogs">
      {posts.map((post) => {
        return <Blog key={post.id} post={post} />;
      })}
    </section>
  );
};

export default Blogs;
