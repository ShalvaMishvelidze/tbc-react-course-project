"use client";
import { addNewRating, getUserRating } from "@/utils/actions/products_actions";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useEffect, useState } from "react";
import { IoStar } from "react-icons/io5";
import LoadingSpinner from "./LoadingSpinner";

const Ratings = ({
  product_id,
  rating: r,
}: {
  product_id: number;
  rating: string;
}) => {
  const { user, error, isLoading } = useUser();
  const [rating, setRating] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getUserRating(user?.sub as string, product_id).then((rating) => {
      if (rating) {
        setRating(rating.rating);
      }
      setLoading(false);
    });
  }, []);

  if (loading || error || isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return null;
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
                  addNewRating(user?.sub as string, product_id, i + 1);
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
