"use server";
import { sql } from "@vercel/postgres";

export async function getProducts() {
  const products = await sql`SELECT * FROM products;`;
  return products.rows;
}
