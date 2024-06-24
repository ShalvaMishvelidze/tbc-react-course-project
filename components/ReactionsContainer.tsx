"use client";
import { addNewPostLike } from "@/utils/actions/blog_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import LoadingSpinner from "./LoadingSpinner";

const ReactionsContainer = ({
  id,
  total_likes,
  total_dislikes,
  user_vote_type,
}: any) => {
  const { user, error, isLoading } = useUser();
  const [likes, setLikes] = useState<number>(Number(total_likes));
  const [dislikes, setDislikes] = useState<number>(Number(total_dislikes));
  const [vote, setVote] = useState(user_vote_type);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="blog-reactions">
      <button
        className={`${
          vote === "like" ? "blog-reactions-btn active" : "blog-reactions-btn"
        }`}
        onClick={() => {
          if (vote === "like") {
            setVote("none");
            setLikes(likes - 1);
            addNewPostLike(id, user?.sub as string, "none");
          } else if (vote === "dislike") {
            setVote("like");
            setLikes(likes + 1);
            setDislikes(dislikes - 1);
            addNewPostLike(id, user?.sub as string, "like");
          } else {
            setVote("like");
            setLikes(likes + 1);
            addNewPostLike(id, user?.sub as string, "like");
          }
        }}
        disabled={!user?.sub}
      >
        <AiFillLike /> {likes}
      </button>
      <button
        className={`${
          vote === "dislike"
            ? "blog-reactions-btn active"
            : "blog-reactions-btn"
        }`}
        onClick={() => {
          if (vote === "dislike") {
            setVote("none");
            setDislikes(dislikes - 1);
            addNewPostLike(id, user?.sub as string, "none");
          } else if (vote === "like") {
            setVote("dislike");
            setDislikes(dislikes + 1);
            setLikes(likes - 1);
            addNewPostLike(id, user?.sub as string, "dislike");
          } else {
            setVote("dislike");
            setDislikes(dislikes + 1);
            addNewPostLike(id, user?.sub as string, "dislike");
          }
        }}
        disabled={!user?.sub}
      >
        <AiFillDislike /> {dislikes}
      </button>
    </div>
  );
};
export default ReactionsContainer;
