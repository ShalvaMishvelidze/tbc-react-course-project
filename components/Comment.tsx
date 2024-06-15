"use client";
import {
  addNewCommentLike,
  deleteComment,
  editComment,
} from "@/utils/actions/blog_actions";
import { useState } from "react";

const Comment = ({ comment: r, user, handleCommentDelete }: any) => {
  const [comment, setComment] = useState<any>(r);
  const [likes, setLikes] = useState<number>(Number(comment.total_likes));
  const [dislikes, setDislikes] = useState<number>(
    Number(comment.total_dislikes)
  );
  const [vote, setVote] = useState(comment.user_vote_type);
  const [editing, setEditing] = useState<boolean>(false);

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
      {editing ? (
        <input
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
        />
      ) : (
        <p className="comment-text">{comment.content}</p>
      )}
      <div className="comment-btn-container">
        {editing ? (
          <button
            type="button"
            onClick={() => {
              editComment(comment.id, comment.content).then((res) => {
                setComment({ ...comment, content: res.content });
                setEditing(false);
              });
            }}
          >
            save
          </button>
        ) : (
          <button type="button" onClick={() => setEditing(true)}>
            edit
          </button>
        )}
        <button
          type="button"
          onClick={() => {
            deleteComment(comment.id).then(() => {
              handleCommentDelete(comment.id);
            });
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default Comment;
