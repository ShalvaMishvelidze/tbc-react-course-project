"use client";
import { Post } from "@/utils/interfaces";
import Link from "next/link";
import ReactionsContainer from "./ReactionsContainer";
import { deletePost } from "@/utils/actions/blog_actions";

export function MyBlog({
  post,
  user,
  setModal,
  setPost,
  setPosts,
}: {
  post: Post;
  user: any;
  setModal: any;
  setPost: any;
  setPosts: any;
}) {
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
      <div className="blog-btn-container">
        <button
          type="button"
          onClick={() => {
            setPost(post);
            setModal(true);
          }}
        >
          edit
        </button>
        <button
          type="button"
          onClick={() => {
            deletePost(post.id).then(() => {
              setPosts((prev: Post[]) => [
                ...prev.filter((p: Post) => p.id !== post.id),
              ]);
            });
          }}
        >
          delete
        </button>
      </div>
    </article>
  );
}
