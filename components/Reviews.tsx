"use client";

import {
  addProductReview,
  getProductReviews,
} from "@/utils/actions/products_actions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Review from "./Review";
import Ratings from "./Ratings";

const Reviews = ({ product_id, user }: any) => {
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (review.length > 0) {
      addProductReview(product_id, user?.sub as string, review).then(
        (newReview) => {
          setReviews([{ ...newReview, upvotes: 0 }, ...reviews]);
        }
      );
    }
  };
  const handleReviewDelete = (id: number) => {
    setReviews([reviews.filter((r) => r.id !== id)]);
  };

  useEffect(() => {
    if (user) {
      getProductReviews(product_id, user?.sub as string).then((reviews) => {
        setReviews(reviews);
      });
    } else {
      getProductReviews(product_id, "no-user").then((reviews) => {
        setReviews(reviews);
      });
    }
  }, [user]);

  return (
    <div className="reviews">
      {user && <Ratings product_id={product_id} owner_id={user.sub} />}
      <h2 className="reviews-add">add new review: </h2>
      <form className="reviews-form" onSubmit={handleSubmit}>
        <textarea
          style={{ color: "#000" }}
          className="reviews-textarea"
          onChange={handleChange}
          value={review}
          placeholder="Write your review here..."
          cols={100}
          rows={10}
        ></textarea>
        <button className="reviews-button" onSubmit={handleSubmit}>
          Submit
        </button>
      </form>
      <div className="reviews-container">
        {reviews.length > 0 &&
          reviews.map((review) => {
            return (
              <Review
                key={review.id}
                review={review}
                handleReviewDelete={handleReviewDelete}
              />
            );
          })}
      </div>
    </div>
  );
};
export default Reviews;
