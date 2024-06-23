import { Post } from "@/utils/interfaces";
import Link from "next/link";
import ReactionsContainer from "./ReactionsContainer";

export function SingleBlog({
  post,
  user,
  text,
}: {
  post: Post;
  user: any;
  text: {
    [key: string]: string;
  };
}) {
  console.log(text);

  return (
    <article className="blog">
      <h4 className="blog-title">{post.title}</h4>
      <p className="blog-desc">
        {post.body.substring(0, 150)}...{" "}
        <Link href={`/blog/${post.id}`}>{text.readMore}</Link>
      </p>
      <div className="blog-container">
        <h4 className="blog-views">
          {text.views}: {post.views}
        </h4>
        <ReactionsContainer
          id={post.id}
          total_likes={post.total_likes}
          total_dislikes={post.total_dislikes}
          user={user}
          user_vote_type={post.user_vote_type}
        />
      </div>
    </article>
  );
}
