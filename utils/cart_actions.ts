"use server";

import { sql } from "@vercel/postgres";
import { cookies } from "next/headers";

export const getCart = async (owner_id) => {
  try {
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
      cart.owner_id = ${owner_id};`;

    return productsData.rows;
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = async (owner_id, product_id) => {
  try {
    const data = await sql`SELECT * FROM cart 
      WHERE product_id = ${product_id} AND owner_id = ${owner_id};`;

    if (data.rows.length > 0) {
      await sql`UPDATE cart SET quantity = quantity + 1 
      WHERE product_id = ${product_id} AND owner_id = ${owner_id};`;

      const quantity = await sql`SELECT SUM(quantity) AS total_quantity 
      FROM cart 
      WHERE owner_id = ${owner_id}`;

      return quantity.rows[0].total_quantity;
    }

    await sql`INSERT INTO cart (owner_id, product_id, quantity)
        VALUES (${owner_id}, ${product_id}, ${1});`.catch((err) =>
      console.log(err)
    );

    const quantity = await sql`SELECT SUM(quantity) AS total_quantity 
      FROM cart 
      WHERE owner_id = ${owner_id}`;

    return quantity.rows[0].total_quantity;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartQuantity = async (id, method) => {
  try {
    if (method === "inc") {
      await sql`
        UPDATE cart
        SET quantity = quantity + 1
        WHERE id = ${id}
      `;
    }
    if (method === "dec") {
      await sql`
        UPDATE cart
        SET quantity = quantity - 1
        WHERE id = ${id} AND quantity > 0
      `;

      const { rows } = await sql`
        SELECT quantity FROM cart WHERE id = ${id}
      `;
      if (rows.length > 0 && rows[0].quantity === 0) {
        await sql`
          DELETE FROM cart WHERE id = ${id}
        `;
      }
    }

    const { rows } = await sql`
        SELECT owner_id FROM cart WHERE id = ${id}
      `;

    const sumQuantity = await sql`SELECT SUM(quantity) AS total_quantity
      FROM cart
      WHERE owner_id = ${rows[0].owner_id}`;

    return sumQuantity.rows[0].total_quantity
      ? sumQuantity.rows[0].total_quantity
      : 0;
  } catch (error) {
    console.log(error);
  }
};

export const clearCart = async (id) => {
  try {
    const { rows } = await sql`
        SELECT owner_id FROM cart WHERE id = ${id}
      `;
    await sql`DELETE FROM cart
    WHERE owner_id = ${rows[0].owner_id};
    `;
  } catch (error) {
    console.log(error);
  }
};

export const getCartQuantity = async (owner_id) => {
  const sumQuantity = await sql`SELECT SUM(quantity) AS total_quantity
     FROM cart WHERE owner_id = ${owner_id}`;
  return sumQuantity.rows[0].total_quantity
    ? sumQuantity.rows[0].total_quantity
    : 0;
};

export const setCartTotalCookie = async (total: number) => {
  const cookieStore = cookies();
  cookieStore.set("cart_total", total.toString());
};

export const getCartTotalCookie = async () => {
  const cookieStore = cookies();
  return cookieStore.get("cart_total");
};
