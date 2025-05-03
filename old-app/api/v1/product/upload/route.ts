import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const POST = withApiAuthRequired(async (request: NextRequest) => {
  const id = request.headers.get("id");
  const {
    name,
    price,
    category,
    brand,
    discountpercentage,
    description,
    image,
    images,
  } = await request.json();

  try {
    await sql`INSERT INTO products (name, price, category, brand, discountpercentage, description, image , images, owner_id)
    VALUES (${name}, ${price},${category},${brand}, ${discountpercentage}, ${description}, ${image}, ${JSON.stringify(
      images
    )}, ${id})`;

    return NextResponse.json(
      { msg: "product added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "could not upload the product" },
      { status: 200 }
    );
  }
});
