"use client";
import { addNewPostLike } from "@/utils/actions/blog_actions";
import { useState } from "react";

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
    <div className="single-blog-reactions">
      <button
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
        like 👍 {likes}
      </button>
      <button
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
        dislike 👎 {dislikes}
      </button>
    </div>
  );
};
export default ReactionsContainer;
