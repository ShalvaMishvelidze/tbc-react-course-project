import { Link } from "@/navigation";

// interface Post {
//   id: string;
//   title: string;
//   body: string;
//   tags: string[];
// }

export default function SingleBlog({ post }) // : { post: Post }
{
  return (
    <article className="single-blog">
      <h4 className="single-blog-title">{post.title}</h4>
      <p className="single-blog-desc">
        {post.body.substring(0, 50)}...{" "}
        <Link href={`/blog/${post.id}`}>read more</Link>
      </p>
    </article>
  );
}
