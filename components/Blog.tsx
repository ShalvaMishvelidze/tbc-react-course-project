import { Post } from "@/utils/interfaces";
import Link from "next/link";

export function Blog({ post }: { post: Post }) {
  return (
    <article className="blog">
      <h4 className="blog-title">{post.title}</h4>
      <p className="blog-desc">
        {post.body.substring(0, 50)}...{" "}
        <Link href={`/blog/${post.id}`}>read more</Link>
      </p>
      <h4>Views: {post.views}</h4>
    </article>
  );
}
