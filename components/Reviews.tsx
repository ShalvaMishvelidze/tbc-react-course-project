"use client";

import {
  addProductReview,
  getProductReviews,
} from "@/utils/actions/products_actions";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import Review from "./Review";
import Toast from "./Toast";
import { toast } from "react-toastify";

const Reviews = ({ product_id, user, role, text }: any) => {
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (review.length > 0) {
      toast.info("Adding review...");
      addProductReview(product_id, user?.sub as string, review).then(
        (newReview) => {
          if (newReview.conflict) {
            setReview("");
            toast.warning(newReview.message);
            return;
          }
          setReviews([{ ...newReview, upvotes: 0 }, ...reviews]);
          setReview("");
          toast.success("New review added!");
        }
      );
    } else {
      toast.warning("You can't write an empty review");
    }
  };
  const handleReviewDelete = (id: number) => {
    setReviews([...reviews.filter((r) => r.id !== id)]);
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
    <div className="single-product-reviews">
      <Toast />
      <h2 className="single-product-reviews-add">{text.addNewReview}:</h2>
      <form className="single-product-reviews-form" onSubmit={handleSubmit}>
        <textarea
          style={{ color: "#000" }}
          className="single-product-reviews-textarea"
          onChange={handleChange}
          value={review}
          placeholder="Write your review here..."
          maxLength={250}
        ></textarea>
        {review.length > 0 && (
          <div>
            <button
              className="single-product-reviews-btn"
              onSubmit={handleSubmit}
            >
              {text.submit}
            </button>
            <button
              className="single-product-reviews-btn"
              onClick={() => setReview("")}
            >
              {text.cancel}
            </button>
          </div>
        )}
      </form>
      <div className="single-product-reviews-container">
        {reviews.length > 0 &&
          reviews.map((review) => {
            return (
              <Review
                key={review.id}
                text={text}
                user={user}
                role={role}
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
