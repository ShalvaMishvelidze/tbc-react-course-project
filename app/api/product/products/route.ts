import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export const POST = async (req: NextRequest) => {
  try {
    const { search, category, sort, order, page } = await req.json();
    if (!sort && !order) {
      const products =
        await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
    FROM products p
    LEFT JOIN (
      SELECT product_id, AVG(rating) AS avg_rating
      FROM ratings
      GROUP BY product_id
      ) avg_rating ON p.id = avg_rating.product_id
      WHERE p.name ilike ${"%" + search + "%"} 
      AND category ILIKE ${"%" + category + "%"}
      LIMIT 12 OFFSET ${(page - 1) * 12};    `;
      return NextResponse.json(products.rows);
    } else if (sort === "name" && order === "asc") {
      const products =
        await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
      FROM products p
      LEFT JOIN (
          SELECT product_id, AVG(rating) AS avg_rating
          FROM ratings
          GROUP BY product_id
      ) avg_rating ON p.id = avg_rating.product_id
      WHERE p.name ilike ${"%" + search + "%"} 
      AND category ILIKE ${"%" + category + "%"}
      ORDER BY p.name ASC
  LIMIT 12 OFFSET ${(page - 1) * 12};    `;
      return NextResponse.json(products.rows);
    } else if (sort === "name" && order === "desc") {
      const products =
        await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
      FROM products p
      LEFT JOIN (
          SELECT product_id, AVG(rating) AS avg_rating
          FROM ratings
          GROUP BY product_id
      ) avg_rating ON p.id = avg_rating.product_id
      WHERE p.name ilike ${"%" + search + "%"} 
      AND category ILIKE ${"%" + category + "%"}
      ORDER BY p.name DESC
  LIMIT 12 OFFSET ${(page - 1) * 12};    `;
      return NextResponse.json(products.rows);
    } else if (sort === "price" && order === "asc") {
      const products =
        await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
      FROM products p
      LEFT JOIN (
          SELECT product_id, AVG(rating) AS avg_rating
          FROM ratings
          GROUP BY product_id
      ) avg_rating ON p.id = avg_rating.product_id
      WHERE p.name ilike ${"%" + search + "%"} 
      AND category ILIKE ${"%" + category + "%"}
      ORDER BY p.price ASC
  LIMIT 12 OFFSET ${(page - 1) * 12};    `;
      return NextResponse.json(products.rows);
    } else if (sort === "price" && order === "desc") {
      const products =
        await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
      FROM products p
      LEFT JOIN (
          SELECT product_id, AVG(rating) AS avg_rating
          FROM ratings
          GROUP BY product_id
      ) avg_rating ON p.id = avg_rating.product_id
      WHERE p.name ilike ${"%" + search + "%"} 
      AND category ILIKE ${"%" + category + "%"}
      ORDER BY p.price DESC
  LIMIT 12 OFFSET ${(page - 1) * 12};    `;
      return NextResponse.json(products.rows);
    } else {
      const products =
        await sql`SELECT p.*, COALESCE(avg_rating.avg_rating, 0) AS average_rating
      FROM products p
      LEFT JOIN (
          SELECT product_id, AVG(rating) AS avg_rating
          FROM ratings
          GROUP BY product_id
      ) avg_rating ON p.id = avg_rating.product_id
  LIMIT 12 OFFSET ${(page - 1) * 12};    `;
      return NextResponse.json(products.rows);
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "something went wrong" },
      { status: 500 }
    );
  }
};
