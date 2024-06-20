"use client";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Comment from "./Comment";
import { addNewComment, getComments } from "@/utils/actions/blog_actions";

const Comments = ({ post_id, user }: any) => {
  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<any[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (comment.length > 0) {
      console.log(post_id, user?.sub as string, comment);

      addNewComment(post_id, user?.sub as string, comment).then(
        (newComment) => {
          setComments([
            { ...newComment, total_likes: 0, total_dislikes: 0 },
            ...comments,
          ]);
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
      <form className="comments-form" onSubmit={handleSubmit}>
        <textarea
          style={{ color: "#000" }}
          className="comments-textarea"
          onChange={handleChange}
          value={comment}
          placeholder="Write your comment here..."
          cols={100}
          rows={10}
        ></textarea>
        <button className="comments-button" onSubmit={handleSubmit}>
          Submit
        </button>
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
              />
            );
          })}
      </div>
    </div>
  );
};
export default Comments;
