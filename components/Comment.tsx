"use client";
import { addNewCommentLike } from "@/utils/actions/blog_actions";
import { useState } from "react";

const Comment = ({ comment: r, user }: any) => {
  const [comment, _] = useState<any>(r);
  const [likes, setLikes] = useState<number>(Number(comment.total_likes));
  const [dislikes, setDislikes] = useState<number>(
    Number(comment.total_dislikes)
  );
  const [vote, setVote] = useState(comment.user_vote_type);

  const handleLike = () => {
    if (vote === "like") {
      setVote("none");
      setLikes(likes - 1);
      addNewCommentLike(comment.id, user.sub, "none");
    } else if (vote === "dislike") {
      setVote("like");
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
      addNewCommentLike(comment.id, user.sub, "like");
    } else {
      setVote("like");
      setLikes(likes + 1);
      addNewCommentLike(comment.id, user.sub, "like");
    }
  };
  const handleDislike = () => {
    if (vote === "dislike") {
      setVote("none");
      setDislikes(dislikes - 1);
      addNewCommentLike(comment.id, user.sub, "none");
    } else if (vote === "like") {
      setVote("dislike");
      setDislikes(dislikes + 1);
      setLikes(likes - 1);
      addNewCommentLike(comment.id, user.sub, "dislike");
    } else {
      setVote("dislike");
      setDislikes(dislikes + 1);
      addNewCommentLike(comment.id, user.sub, "dislike");
    }
  };

  return (
    <div className="comment">
      <div className="vote-container">
        <button type="button" onClick={handleLike}>
          like 👍 {likes}
        </button>
        <span>{comment.upvotes}</span>
        <button type="button" onClick={handleDislike}>
          dislike 👎 {dislikes}
        </button>
      </div>
      <p className="comment-text">{comment.content}</p>
    </div>
  );
};
export default Comment;
