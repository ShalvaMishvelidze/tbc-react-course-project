"use client";

import {
  addProductReview,
  getProductReviews,
  reviewConflict,
} from "@/utils/actions/products_actions";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import Review from "./Review";
import Toast from "./Toast";
import { toast } from "react-toastify";
import Image from "next/image";

const Reviews = ({ product_id, user, role, text }: any) => {
  const [review, setReview] = useState<string>("");
  const [reviews, setReviews] = useState<any[]>([]);
  const [i, setI] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const imageRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const conflict = await reviewConflict(product_id, user?.sub as string);
    if (conflict) {
      setReview("");
      setImages([]);
      toast.warning(
        "You have already reviewed this product! Users can only review product once."
      );
      return;
    }
    if (review.length > 0) {
      toast.info("Adding review...");
      let imageBlobs = [];
      if (i.length !== 0) {
        imageBlobs = await Promise.all(
          i.map(async (img) => {
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_URL}api/image/upload?filename=${img.name}`,
              {
                method: "POST",
                body: img,
              }
            );
            const data = await res.json();
            return data.url;
          })
        );
        setImages([]);
      }
      const newReview = await addProductReview(
        product_id,
        user?.sub as string,
        imageBlobs!,
        review
      );

      setReviews([{ ...newReview, upvotes: 0 }, ...reviews]);
      setReview("");
      toast.success("New review added!");
    } else {
      toast.warning("You can't write an empty review");
    }
  };
  const handleReviewDelete = (id: number) => {
    setReviews([...reviews.filter((r) => r.id !== id)]);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0].size > 1024 * 1024) {
      imageRef.current!.value = "";
      toast.error(
        "Image size is too big! You can only upload images up to 1MB."
      );
      return;
    } else {
      if (i.length >= 3) {
        toast.error("You can only upload up to 3 images per review.");
        return;
      }
      const files = e.target.files;
      if (files !== null) {
        const file = files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            if (e.target) {
              setImages([...images, e.target.result as string]);
            }
          };
          reader.readAsDataURL(file);
        }
        setI([...i, files[0]]);
      }
    }
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
        <div className="images">
          {images.length > 0 &&
            images.map((img) => (
              <Image
                key={img}
                alt={"review-image"}
                src={img}
                width={90}
                height={90}
              />
            ))}
        </div>
        {review.length > 0 && (
          <div className="buttons">
            <button
              className="single-product-reviews-btn"
              onSubmit={handleSubmit}
            >
              {text.submit}
            </button>
            <button
              className="single-product-reviews-btn"
              onClick={() => {
                setReview("");
                setImages([]);
                setI([]);
              }}
            >
              {text.cancel}
            </button>
            <label htmlFor="img-input">{text.uploadImage}</label>
            <input
              type="file"
              id="img-input"
              ref={imageRef}
              multiple
              onChange={handleImageChange}
            />
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
