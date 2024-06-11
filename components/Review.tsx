"use client";
import { voteOnReview } from "@/utils/actions/products_actions";
import { useState } from "react";

const Review = ({ review: r }: any) => {
  const [review, setReview] = useState<any>(r);

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
      <p className="review-text">{review.review}</p>
    </div>
  );
};
export default Review;
