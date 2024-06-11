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

export async function getSingleProduct(id: string) {
  const product =
    await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
    FROM products p
    LEFT JOIN (
        SELECT product_id, AVG(rating) AS avg_rating
        FROM ratings
        GROUP BY product_id
    ) avg_rating ON p.id = avg_rating.product_id
    WHERE p.id = ${id};
    `;
  return product.rows[0];
}

export async function getProductReviews(product_id: number, owner_id: string) {
  const reviews = await sql`SELECT r.*, u.vote_type AS user_vote_type
  FROM reviews r
  LEFT JOIN upvotes u ON r.id = u.review_id AND u.owner_id = ${owner_id}
  WHERE r.product_id = ${product_id} 
  ORDER BY r.owner_id = ${owner_id} DESC;
  `;
  return reviews.rows;
}

export async function getUserRating(owner_id: string, product_id: number) {
  const rating = await sql`SELECT rating FROM ratings 
  WHERE owner_id = ${owner_id} AND product_id = ${product_id};
  `;
  return rating.rows[0];
}

export async function addNewRating(
  owner_id: string,
  product_id: number,
  rating: number
) {
  await sql`INSERT INTO ratings (owner_id, product_id, rating)
  VALUES (${owner_id}, ${product_id}, ${rating}) 
  ON CONFLICT (owner_id, product_id) 
  DO UPDATE SET rating = ${rating};
  `;
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
    DO NOTHING
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
