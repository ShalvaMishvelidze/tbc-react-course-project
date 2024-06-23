"use client";
import { addNewPostLike } from "@/utils/actions/blog_actions";
import { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const ReactionsContainer = ({
  id,
  total_likes,
  total_dislikes,
  user,
  user_vote_type,
}: any) => {
  const [likes, setLikes] = useState<number>(Number(total_likes));
  const [dislikes, setDislikes] = useState<number>(Number(total_dislikes));
  const [vote, setVote] = useState(user_vote_type);

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
            addNewPostLike(id, user.sub, "none");
          } else if (vote === "dislike") {
            setVote("like");
            setLikes(likes + 1);
            setDislikes(dislikes - 1);
            addNewPostLike(id, user.sub, "like");
          } else {
            setVote("like");
            setLikes(likes + 1);
            addNewPostLike(id, user.sub, "like");
          }
        }}
        disabled={!user}
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
            addNewPostLike(id, user.sub, "none");
          } else if (vote === "like") {
            setVote("dislike");
            setDislikes(dislikes + 1);
            setLikes(likes - 1);
            addNewPostLike(id, user.sub, "dislike");
          } else {
            setVote("dislike");
            setDislikes(dislikes + 1);
            addNewPostLike(id, user.sub, "dislike");
          }
        }}
        disabled={!user}
      >
        <AiFillDislike /> {dislikes}
      </button>
    </div>
  );
};
export default ReactionsContainer;
