"use client";
import {
  deleteReview,
  editProductReview,
  voteOnReview,
} from "@/utils/actions/products_actions";
import { useState } from "react";

const Review = ({ review: r, handleReviewDelete }: any) => {
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
      <div className="vote-container">
        <button type="button" onClick={handleUpvote}>
          upvote
        </button>
        <span>{review.upvotes}</span>
        <button type="button" onClick={handleDownvote}>
          downvote
        </button>
      </div>
      {editing ? (
        <input
          value={review.review}
          onChange={(e) => setReview({ ...review, review: e.target.value })}
        />
      ) : (
        <p className="review-text">{review.review}</p>
      )}
      <div className="review-btn-container">
        {editing ? (
          <button
            type="button"
            onClick={() => {
              editProductReview(review.id, review.review).then((res) => {
                setReview({ ...review, review: res.review });
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
            deleteReview(review.id).then(() => {
              handleReviewDelete(review.id);
            });
          }}
        >
          delete
        </button>
      </div>
    </div>
  );
};
export default Review;
