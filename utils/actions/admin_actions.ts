"use server";
import { del } from "@vercel/blob";
import { sql } from "@vercel/postgres";

export const getUsers = async (search: string, page: number) => {
  const users = await sql`SELECT *
    FROM users
    WHERE lower(concat(name, ' ', lastname, ' ', email)) 
    ILIKE lower(${"%" + search + "%"})
    LIMIT 12 OFFSET ${(page - 1) * 12};
    `;
  return users.rows;
};

export const getUserPageCount = async () => {
  const count = await sql`
        SELECT COUNT(*) FROM users;
        `;
  return Math.ceil(count.rows[0].count / 12);
};

export const getProducts = async (search: string, page: number) => {
  const products = await sql`SELECT * FROM products 
    WHERE name ILIKE ${"%" + search + "%"} 
    LIMIT 12 OFFSET ${(page - 1) * 12};
    `;
  return products.rows;
};

export const getProductsPageCount = async () => {
  const count = await sql`
        SELECT COUNT(*) FROM products;
        `;
  return Math.ceil(count.rows[0].count / 12);
};

export const getPosts = async (search: string, page: number) => {
  const posts = await sql`
    SELECT * from posts 
    WHERE title ILIKE ${"%" + search + "%"} 
    LIMIT 12 OFFSET ${(page - 1) * 12};`;
  return posts.rows;
};

export const getPostPageCount = async () => {
  const count = await sql`
            SELECT COUNT(*) FROM posts;
            `;
  return Math.ceil(count.rows[0].count / 12);
};

export const editUser = async (user: any) => {
  const editedUser = await sql`
        UPDATE users
        SET name = ${user.name}, lastname = ${user.lastname}, 
        email = ${user.email}, role = ${user.role}, image = ${user.image}
        WHERE id = ${user.id}
        RETURNING *;`;
  return editedUser.rows[0];
};

export const deleteUser = async (id: number) => {
  await sql`
        DELETE FROM users
        WHERE id = ${id}
        RETURNING *;`;
};

export const editPost = async (post: any) => {
  await sql`
        UPDATE posts
        SET title = ${post.title}, body = ${post.body}, 
        tags = ${JSON.stringify(post.tags)}
        WHERE id = ${post.id};`;
};

export const deletePost = async (id: number) => {
  await sql`
        DELETE FROM posts
        WHERE id = ${id};`;
};

export const deleteImage = async (url: string) => {
  console.log("deleted");
  await del(url).catch((e) => console.error(e));
};

export const editProduct = async (product: any) => {
  await sql`
        UPDATE products
        SET name = ${product.name}, description = ${product.description}, 
        price = ${product.price}, category = ${product.category}, 
        brand = ${product.brand}, image = ${product.image}, 
        discountpercentage = ${product.discountpercentage},
        images = ${JSON.stringify(product.images)}
        WHERE id = ${product.id};`;
};

export const deleteProduct = async (id: number) => {
  await sql`
        DELETE FROM products
        WHERE id = ${id};`;
};
