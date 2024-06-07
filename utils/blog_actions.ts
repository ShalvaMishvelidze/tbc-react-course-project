"use server";
import { sql } from "@vercel/postgres";

export const addNewPost = async (title, body, tags, owner_id) => {
  try {
    await sql`INSERT INTO posts (title, body, tags, owner_id) 
        VALUES (${title}, ${body}, ${JSON.stringify(tags)}, ${owner_id})`.catch(
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async (owner_id) => {
  try {
    const posts = await sql`SELECT * FROM posts WHERE owner_id = ${owner_id}`;
    return posts.rows;
  } catch (error) {
    console.log(error);
  }
};

export const getPost = async (id) => {
  try {
    const post = await sql`SELECT * FROM posts WHERE id = ${id}`;
    return post.rows[0];
  } catch (error) {
    console.log(error);
  }
};
