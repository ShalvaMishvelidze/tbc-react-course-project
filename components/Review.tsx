"use client";
import {
  deleteReview,
  editProductReview,
  voteOnReview,
} from "@/utils/actions/products_actions";
import { del } from "@vercel/blob";
import Image from "next/image";
import { useRef, useState } from "react";
import { ImArrowUp, ImArrowDown } from "react-icons/im";
import { toast } from "react-toastify";
import { MdCancel } from "react-icons/md";

const Review = ({ review: r, handleReviewDelete, id, role, text }: any) => {
  const [review, setReview] = useState<any>(r);
  const [editing, setEditing] = useState<boolean>(false);
  const [displayImages, setDisplayImages] = useState<string[]>(
    r.images ? r.images : []
  );
  const [delImages, setDelImages] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<any[]>([]);

  const rImageRef = useRef<HTMLInputElement>(null);

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
        <button type="button" onClick={handleUpvote} disabled={!id}>
          <ImArrowUp />
        </button>
        <span>{review.upvotes}</span>
        <button type="button" onClick={handleDownvote} disabled={!id}>
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
        {displayImages.length > 0 && (
          <div className="review-container-images">
            {displayImages.map((img: string) => (
              <div>
                <Image
                  key={img}
                  alt={"review-image"}
                  src={img}
                  width={90}
                  height={90}
                />
                {editing && (
                  <button
                    onClick={() => {
                      if (!r.images.some((i: string) => i === img)) {
                        setDelImages([...delImages, img]);
                      }
                      setDisplayImages([
                        ...displayImages.filter((i) => i !== img),
                      ]);
                      setReview({
                        ...review,
                        images: review.images.filter((i: string) => i !== img),
                      });
                    }}
                  >
                    <MdCancel />
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {(id === review.owner_id || role === "admin") && (
        <div className="review-btn-container">
          {editing ? (
            <button
              type="button"
              onClick={async () => {
                toast.info("saving review...");
                if (delImages.length !== 0) {
                  await Promise.all(
                    delImages.map(async (img) => {
                      await del(img);
                    })
                  );
                }
                let imageBlobs = [];
                if (newImages.length !== 0) {
                  imageBlobs = await Promise.all(
                    newImages.map(async (img) => {
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
                }

                const res = await editProductReview(
                  review.id,
                  review.review,
                  review.images
                    ? [...review.images, ...imageBlobs]
                    : [...imageBlobs]
                );
                setReview({ ...r, review: res.review, images: res.images });
                setEditing(false);
                toast.success("review saved!");
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
                setDelImages([]);
                setNewImages([]);
                setReview(review);
              }}
            >
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
          {editing && (
            <div>
              <label htmlFor="img-input">{text.uploadImage}</label>
              <input
                type="file"
                id="img-input"
                ref={rImageRef}
                multiple
                onChange={(e) => {
                  if (displayImages.length >= 3) {
                    toast.error(
                      "You can only upload up to 3 images per review."
                    );
                    return;
                  }
                  if (e.target.files![0].size > 1024 * 1024) {
                    rImageRef.current!.value = "";
                    toast.error(
                      "Image size is too big! You can only upload images up to 1MB."
                    );
                    return;
                  }
                  const file = e.target.files![0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = function (e) {
                      if (e.target) {
                        setDisplayImages([
                          ...displayImages,
                          e.target.result as string,
                        ]);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                  setNewImages([...newImages, e.target.files![0]]);
                }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
export default Review;
