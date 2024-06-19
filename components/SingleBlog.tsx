import { Post } from "@/utils/interfaces";
import Link from "next/link";
import ReactionsContainer from "./ReactionsContainer";

export function SingleBlog({ post, user }: { post: Post; user: any }) {
  return (
    <article className="blog">
      <h4 className="blog-title">{post.title}</h4>
      <p className="blog-desc">
        {post.body.substring(0, 50)}...{" "}
        <Link href={`/blog/${post.id}`}>read more</Link>
      </p>
      <h4>Views: {post.views}</h4>
      <ReactionsContainer
        id={post.id}
        total_likes={post.total_likes}
        total_dislikes={post.total_dislikes}
        user={user}
        user_vote_type={post.user_vote_type}
      />
    </article>
  );
}
