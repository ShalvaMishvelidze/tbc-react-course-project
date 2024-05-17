import { sql } from "@vercel/postgres";
import { validateJWT } from "@/utils/functions";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    try {
      const body = await request.json();

      
      const token:any = cookies().get("token")
      
      const info:any = await validateJWT(token.value as string)
      .catch((err)=> console.log(err))
      
      const data =
      await sql`SELECT * FROM cart WHERE product_id = ${body.product_id} AND user_id = ${info.id};`;

    if (data.rows.length > 0) {
      
      await sql`UPDATE cart SET quantity = quantity + 1 WHERE product_id = ${body.product_id} AND user_id = ${info.id};`;

      const productsData: any = await sql`SELECT * FROM cart;`

      const quantity = productsData.rows.reduce((acc:number, cur:{quantity:number}) => acc + cur.quantity, 0)

      cookies().set("cart_total", quantity)

      return NextResponse.json(
        { error: "update product successfully" },
        { status: 200 }
      );
    }

        await sql`INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at)
        VALUES (${info.id}, ${body.product_id}, ${1}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`
        .catch((err)=> console.log(err))

       const productsData: any = await sql`SELECT * FROM cart;`

       const quantity = productsData.rows.reduce((acc:number, cur:{quantity:number}) => acc + cur.quantity, 0)

       cookies().set("cart_total", quantity)

      return NextResponse.json(
        { msg: "Product is added successfully!" },
        { status: 201 }
      );
    } catch (error) {
      return new Response("Failed to add product", {
        status: 400,
      });
    }
  };