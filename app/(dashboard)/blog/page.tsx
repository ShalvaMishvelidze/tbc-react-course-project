import { getAllPosts } from "@/utils/actions/blog_actions";
import { Blog } from "../../../components/Blog";
import { Post } from "@/utils/interfaces";
import { getSession } from "@auth0/nextjs-auth0";

const Blogs = async () => {
  const session = await getSession();
  const posts: Post[] = (await getAllPosts(
    session?.user.sub as string
  )) as Post[];

  return (
    <section className="blogs">
      {posts.map((post) => {
        return <Blog key={post.id} post={post} user={session?.user} />;
      })}
    </section>
  );
};

export default Blogs;
