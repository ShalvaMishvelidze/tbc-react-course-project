import { sql } from "@vercel/postgres";
// import { validateJWT } from "@/utils/functions";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const id = req.headers.get("id");
    console.log(id);

    // const authorizationHeader = req.headers.get("authorization");

    // const info: any = await validateJWT(authorizationHeader as string).catch(
    //   (err) => console.log(err)
    // );

    const productsData = await sql`SELECT
    products.name,
    products.description,
    products.price,
    products.discountpercentage,
    products.brand,
    products.category,
    products.image,
    cart.id,
    cart.quantity
    FROM
      cart
    JOIN
      products ON cart.product_id = products.id
    WHERE
      cart.owner_id = ${id};`;

    return NextResponse.json(
      { msg: "success", data: productsData.rows },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json({ msg: "fail" }, { status: 400 });
  }
};

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const id = request.headers.get("id");

    // const token: any = cookies().get("token");

    // const info: any = await validateJWT(token.value as string).catch((err) =>
    //   console.log(err)
    // );

    const data =
      await sql`SELECT * FROM cart WHERE product_id = ${body.product_id} AND user_id = ${id};`;

    if (data.rows.length > 0) {
      await sql`UPDATE cart SET quantity = quantity + 1 WHERE product_id = ${body.product_id} AND user_id = ${id};`;

      const quantity = await sql`SELECT SUM(quantity) AS total_quantity 
      FROM cart 
      WHERE user_id = ${id}`;

      return NextResponse.json(
        {
          msg: "update product successfully",
          quantity: quantity.rows[0].total_quantity,
        },
        { status: 200 }
      );
    }

    await sql`INSERT INTO cart (user_id, product_id, quantity, created_at, updated_at)
        VALUES (${id}, ${
      body.product_id
    }, ${1}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);`.catch((err) =>
      console.log(err)
    );

    const quantity = await sql`SELECT SUM(quantity) AS total_quantity 
      FROM cart 
      WHERE user_id = ${id}`;

    return NextResponse.json(
      {
        msg: "Product is added successfully!",
        quantity: quantity.rows[0].total_quantity,
      },
      { status: 201 }
    );
  } catch (error) {
    return new Response("Failed to add product", {
      status: 400,
    });
  }
};

export const PATCH = async (req: NextRequest) => {
  // const authorizationHeader = req.headers.get("authorization");

  // const info: any = await validateJWT(authorizationHeader as string).catch(
  //   (err) => console.log(err)
  // );
  const id = req.headers.get("id");

  const args = await req.json();

  try {
    if (args.method === "inc") {
      await sql`
        UPDATE cart
        SET quantity = quantity + 1
        WHERE id = ${args.id}
      `;
    }
    if (args.method === "dec") {
      await sql`
        UPDATE cart
        SET quantity = quantity - 1
        WHERE id = ${args.id} AND quantity > 0
      `;

      const { rows } = await sql`
        SELECT quantity FROM cart WHERE id = ${args.id}
      `;
      if (rows.length > 0 && rows[0].quantity === 0) {
        await sql`
          DELETE FROM cart WHERE id = ${args.id}
        `;
      }
    }

    const sumQuantity = await sql`SELECT SUM(quantity) AS total_quantity 
      FROM cart 
      WHERE user_id = ${id}`;

    return NextResponse.json(
      {
        msg: "Product quantity changed!",
        data: sumQuantity.rows[0].total_quantity
          ? sumQuantity.rows[0].total_quantity
          : 0,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Error!" }, { status: 400 });
  }
};

export const DELETE = async (req: NextRequest) => {
  // const authorizationHeader = req.headers.get("authorization");

  // const info: any = await validateJWT(authorizationHeader as string).catch(
  //   (err) => console.log(err)
  // );
  const id = req.headers.get("id");

  try {
    await sql`DELETE FROM cart
    WHERE user_id = ${id};
    `;
    return NextResponse.json(
      { msg: "Product quantity changed!" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ msg: "Error!" }, { status: 400 });
  }
};
