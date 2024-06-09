"use server";
import { sql } from "@vercel/postgres";

export async function getProducts() {
  const products =
    await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
    FROM products p
    LEFT JOIN (
        SELECT product_id, AVG(rating) AS avg_rating
        FROM ratings
        GROUP BY product_id
    ) avg_rating ON p.id = avg_rating.product_id;
    `;
  return products.rows;
}

// add rating to single product
export async function getSingleProduct(id: string) {
  const product = await sql`SELECT * FROM products WHERE id = ${id};`;
  return product.rows[0];
}

export async function getProductReviews(product_id: number, onwer_id: string) {
  const reviews = await sql`SELECT r.*, u.vote_type AS user_vote_type
  FROM reviews r
  LEFT JOIN upvotes u ON r.id = u.review_id AND u.owner_id = ${onwer_id}
  WHERE r.product_id = ${product_id};
  `;
  return reviews.rows;
}

// update rating for new rating tables
export async function getProductRating(id: number) {
  const avgRating = await sql`SELECT AVG(rating) AS average_rating
  FROM reviews
  WHERE product_id = ${id};
  `;
  return avgRating.rows[0].average_rating;
}

export async function addProductReview(
  product_id: number,
  owner_id: string,
  review: string
) {
  const addedReview =
    await sql`INSERT INTO reviews (product_id, owner_id, review)
    VALUES (${product_id}, ${owner_id}, ${review})
    ON CONFLICT (product_id, owner_id)
    DO UPDATE SET review = EXCLUDED.review
    RETURNING *;
    `;
  return addedReview.rows[0];
}

export async function addProductRating(product_id: number, rating: number) {
  await sql`INSERT INTO reviews (product_id, rating)
  VALUES (${product_id}, ${rating});
  `;
}

export async function voteOnReview(
  review_id: number,
  owner_id: string,
  vote_type: string,
  had_type: boolean = false
) {
  if (vote_type === "unupvote" || vote_type === "undownvote") {
    await sql`DELETE FROM upvotes WHERE review_id = ${review_id} AND owner_id = ${owner_id};`;
  } else {
    await sql`INSERT INTO upvotes (review_id, owner_id, vote_type) 
    VALUES (${review_id}, ${owner_id}, ${vote_type}) 
    ON CONFLICT (review_id, owner_id) DO UPDATE SET vote_type = ${vote_type};`;
  }
  if (vote_type === "upvote" && had_type) {
    await sql`UPDATE reviews SET upvotes = upvotes + 2 WHERE id = ${review_id};`;
  } else if (vote_type === "upvote" || vote_type === "undownvote") {
    await sql`UPDATE reviews SET upvotes = upvotes + 1 WHERE id = ${review_id};`;
  }

  if (vote_type === "downvote" && had_type) {
    await sql`UPDATE reviews SET upvotes = upvotes - 2 WHERE id = ${review_id};`;
  } else if (vote_type === "downvote" || vote_type === "unupvote") {
    await sql`UPDATE reviews SET upvotes = upvotes - 1 WHERE id = ${review_id};`;
  }
}
