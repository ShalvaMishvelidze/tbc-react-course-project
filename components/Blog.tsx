import Link from "next/link";

interface Post {
  id: string;
  title: string;
  body: string;
  reactions: number;
  tags: string[];
  userId: number;
}

export function Blog({ post }: { post: Post }) {
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
