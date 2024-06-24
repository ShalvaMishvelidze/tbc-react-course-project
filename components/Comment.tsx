"use client";
import {
  addNewCommentLike,
  deleteComment,
  editComment,
} from "@/utils/actions/blog_actions";
import { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { toast } from "react-toastify";

const Comment = ({
  comment: r,
  user,
  handleCommentDelete,
  text,
  role,
}: any) => {
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
      addNewCommentLike(comment.id, user?.sub, "none");
    } else if (vote === "dislike") {
      setVote("like");
      setLikes(likes + 1);
      setDislikes(dislikes - 1);
      addNewCommentLike(comment.id, user?.sub, "like");
    } else {
      setVote("like");
      setLikes(likes + 1);
      addNewCommentLike(comment.id, user?.sub, "like");
    }
  };
  const handleDislike = () => {
    if (vote === "dislike") {
      setVote("none");
      setDislikes(dislikes - 1);
      addNewCommentLike(comment.id, user?.sub, "none");
    } else if (vote === "like") {
      setVote("dislike");
      setDislikes(dislikes + 1);
      setLikes(likes - 1);
      addNewCommentLike(comment.id, user?.sub, "dislike");
    } else {
      setVote("dislike");
      setDislikes(dislikes + 1);
      addNewCommentLike(comment.id, user?.sub, "dislike");
    }
  };

  return (
    <div className="comment">
      {editing ? (
        <textarea
          className="comment-text"
          value={comment.content}
          onChange={(e) => setComment({ ...comment, content: e.target.value })}
          maxLength={250}
        />
      ) : (
        <p className="comment-text">{comment.content}</p>
      )}
      <div className="comment-vote-container">
        <button
          type="button"
          onClick={handleLike}
          disabled={!user}
          className={`${
            vote === "like"
              ? "comment-reaction-btn active"
              : "comment-reaction-btn"
          }`}
        >
          <AiFillLike /> {likes}
        </button>
        <span>{comment.upvotes}</span>
        <button
          type="button"
          onClick={handleDislike}
          disabled={!user}
          className={`${
            vote === "dislike"
              ? "comment-reaction-btn active"
              : "comment-reaction-btn"
          }`}
        >
          <AiFillDislike /> {dislikes}
        </button>
      </div>
      {(role === "admin" || comment.owner_id === user?.sub) && (
        <div className="comment-btn-container">
          {editing ? (
            <button
              type="button"
              onClick={() => {
                toast.info("trying to edit comment");
                editComment(comment.id, comment.content).then((res) => {
                  setComment({ ...comment, content: res.content });
                  setEditing(false);
                  toast.success("comment edited successfully");
                });
              }}
            >
              {text.save}
            </button>
          ) : (
            <button type="button" onClick={() => setEditing(true)}>
              {text.edit}
            </button>
          )}
          {editing ? (
            <button
              type="button"
              onClick={() => {
                setEditing(false);
              }}
            >
              {text.cancel}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                deleteComment(comment.id).then(() => {
                  handleCommentDelete(comment.id);
                });
              }}
            >
              {text.delete}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
export default Comment;
