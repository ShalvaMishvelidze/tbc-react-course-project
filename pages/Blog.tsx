import SingleBlog from "@/components/SingleBlog";
import { Link } from "@/navigation";
import { getAllPosts } from "@/utils/blog_actions";
import { getSession } from "@auth0/nextjs-auth0";

const Blog = async () => {
  const session = await getSession();
  const posts = await getAllPosts(session?.user.sub as string);
  return (
    <section className="blog">
      <div className="blog-header">
        <h1>blog page</h1>
        <Link href={"/add-new-post"}>add new post</Link>
      </div>
      <div className="blog-container">
        {posts?.map((post) => {
          return <SingleBlog key={post.id} post={post} />;
        })}
      </div>
    </section>
  );
};
export default Blog;
