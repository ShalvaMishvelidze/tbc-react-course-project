"use client";
import {
  deleteReview,
  editProductReview,
  voteOnReview,
} from "@/utils/actions/products_actions";
import { useState } from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { toast } from "react-toastify";

const Review = ({ review: r, handleReviewDelete, user, role, text }: any) => {
  const [review, setReview] = useState<any>(r);
  const [editing, setEditing] = useState<boolean>(false);

  const handleUpvote = () => {
    if (review.user_vote_type === "upvote") {
      setReview({ ...review, upvotes: review.upvotes - 1, user_vote_type: "" });
      voteOnReview(review.id, review.owner_id, "unupvote");
      return;
    }
    if (review.user_vote_type === "downvote") {
      setReview({
        ...review,
        upvotes: review.upvotes + 2,
        user_vote_type: "upvote",
      });
      voteOnReview(review.id, review.owner_id, "upvote", true);
      return;
    }
    setReview({
      ...review,
      upvotes: review.upvotes + 1,
      user_vote_type: "upvote",
    });
    voteOnReview(review.id, review.owner_id, "upvote");
  };

  const handleDownvote = () => {
    if (review.user_vote_type === "downvote") {
      setReview({ ...review, upvotes: review.upvotes + 1, user_vote_type: "" });
      voteOnReview(review.id, review.owner_id, "undownvote");
      return;
    }
    if (review.user_vote_type === "upvote") {
      setReview({
        ...review,
        upvotes: review.upvotes - 2,
        user_vote_type: "downvote",
      });
      voteOnReview(review.id, review.owner_id, "downvote", true);
      return;
    }
    setReview({
      ...review,
      upvotes: review.upvotes - 1,
      user_vote_type: "downvote",
    });
    voteOnReview(review.id, review.owner_id, "downvote");
  };

  return (
    <div className="review">
      <div className="review-vote-btns">
        <button type="button" onClick={handleUpvote}>
          <ImArrowUp />
        </button>
        <span>{review.upvotes}</span>
        <button type="button" onClick={handleDownvote}>
          <ImArrowDown />
        </button>
      </div>
      <div className="review-container">
        {editing ? (
          <textarea
            value={review.review}
            onChange={(e) => setReview({ ...review, review: e.target.value })}
            maxLength={250}
          />
        ) : (
          <p className="review-text">{review.review}</p>
        )}
      </div>
      {(user.sub === review.owner_id || role === "admin") && (
        <div className="review-btn-container">
          {editing ? (
            <button
              type="button"
              onClick={() => {
                toast.info("saving review...");
                editProductReview(review.id, review.review).then((res) => {
                  setReview({ ...review, review: res.review });
                  setEditing(false);
                  toast.success("review saved!");
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
            <button type="button" onClick={() => setEditing(false)}>
              {text.cancel}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                toast.info("trying to delete review...");
                deleteReview(review.id).then(() => {
                  handleReviewDelete(review.id);
                  toast.success("review deleted!");
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
export default Review;
