"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Comment from "./Comment";
import {
  addNewComment,
  commentConflict,
  getComments,
} from "@/utils/actions/blog_actions";
import Toast from "./Toast";
import { toast } from "react-toastify";

const Comments = ({ post_id, user, text, role }: any) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("you must be logged in to comment");
      return;
    }

    const conflict = await commentConflict(post_id, user?.sub as string);

    if (conflict) {
      setComment("");
      toast.warning("you have already commented on this post");
      return;
    }

    if (comment.length > 0) {
      toast.info("trying to add new comment");
      addNewComment(post_id, user?.sub as string, comment).then(
        (newComment) => {
          setComments([
            { ...newComment, total_likes: 0, total_dislikes: 0 },
            ...comments,
          ]);
          toast.success("comment added successfully");
        }
      );
    }
  };

  const handleCommentDelete = (id: number) => {
    setComments([comments.filter((comment) => comment.id !== id)]);
  };

  useEffect(() => {
    if (user) {
      getComments(post_id, user?.sub as string).then((comments) => {
        setComments(comments);
      });
    } else {
      getComments(post_id, user?.sub as string).then((comments) => {
        setComments(comments);
      });
    }
  }, [user]);

  return (
    <div className="comments">
      <Toast />
      <form className="comments-form" onSubmit={handleSubmit}>
        <h2>{text.addNewComment}: </h2>
        <textarea
          style={{ color: "#000" }}
          className="comments-textarea"
          onChange={handleChange}
          value={comment}
          placeholder={text.commentPlaceholder}
          maxLength={250}
        ></textarea>
        {comment.length > 0 && (
          <div className="comments-form-btns">
            <button className="comments-form-btn" onSubmit={handleSubmit}>
              {text.submit}
            </button>
            <button
              className="comments-form-btn"
              type="button"
              onClick={() => setComment("")}
            >
              {text.cancel}
            </button>
          </div>
        )}
      </form>
      <div className="comments-container">
        {comments.length > 0 &&
          comments.map((comment) => {
            return (
              <Comment
                key={comment.id}
                comment={comment}
                user={user}
                handleCommentDelete={handleCommentDelete}
                text={text}
                role={role}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Comments;
