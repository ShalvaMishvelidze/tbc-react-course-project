"use client";
import { Post } from "@/utils/interfaces";
import Link from "next/link";
import ReactionsContainer from "./ReactionsContainer";
import { deletePost } from "@/utils/actions/blog_actions";
import { toast } from "react-toastify";

export function MyBlog({
  post,
  user,
  setModal,
  setPost,
  setPosts,
  text,
}: {
  post: Post;
  user: any;
  setModal: any;
  setPost: any;
  setPosts: any;
  text: { [key: string]: string };
}) {
  return (
    <article className="blog">
      <h4 className="blog-title">{post.title}</h4>
      <p className="blog-desc">
        {post.body.substring(0, 50)}...{" "}
        <Link href={`/blog/${post.id}`}>{text.readMore}</Link>
      </p>
      <h4>
        {text.views}: {post.views}
      </h4>
      <ReactionsContainer
        id={post.id}
        total_likes={post.total_likes}
        total_dislikes={post.total_dislikes}
        user={user}
        user_vote_type={post.user_vote_type}
      />
      <div className="blog-btn-container">
        <button
          type="button"
          onClick={() => {
            setPost(post);
            setModal(true);
          }}
        >
          {text.edit}
        </button>
        <button
          type="button"
          onClick={() => {
            toast.info("Deleting post...");
            deletePost(post.id).then(() => {
              setPosts((prev: Post[]) => [
                ...prev.filter((p: Post) => p.id !== post.id),
              ]);
              toast.success("Post deleted");
            });
          }}
        >
          {text.delete}
        </button>
      </div>
    </article>
  );
}
