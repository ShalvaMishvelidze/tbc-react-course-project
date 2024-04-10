import Link from "next/link";

export function Blog({ post }) {
  return (
    <article className="blog">
      <h4 className="blog-title">{post.title}</h4>
      <p className="blog-desc">
        {post.body.substring(0, 50)}...{" "}
        <Link href={`/blog/${post.id}`}>read more</Link>
      </p>
      <h4>Reactions: {post.reactions}</h4>
    </article>
  );
}
