"use client";
import { addNewRating, getUserRating } from "@/utils/actions/products_actions";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";

const Ratings = ({
  owner_id,
  product_id,
  rating: r,
}: {
  owner_id: string;
  product_id: number;
  rating: string;
}) => {
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserRating(owner_id, product_id).then((rating) => {
      if (rating) {
        setRating(rating.rating);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="loading">loading...</div>;
  }

  return (
    <div className="rating">
      {Array(5)
        .fill(null)
        .map((_, i) => {
          return (
            <button className="rating-btn" key={i}>
              <IoStar
                key={i}
                className={`rating-star ${i + 1 <= rating && "active"}`}
                onClick={() => {
                  setRating(i + 1);
                  addNewRating(owner_id, product_id, i + 1);
                }}
              />
            </button>
          );
        })}
      <span>({r.substring(0, 3)})</span>
    </div>
  );
};
export default Ratings;
