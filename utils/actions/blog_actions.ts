"use server";
import { sql } from "@vercel/postgres";

export const addNewPost = async (
  title: string,
  body: string,
  tags: string[],
  owner_id: string
) => {
  try {
    await sql`INSERT INTO posts (title, body, tags, owner_id) 
        VALUES (${title}, ${body}, ${JSON.stringify(tags)}, ${owner_id})`.catch(
      (err) => console.log(err)
    );
  } catch (error) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await sql`SELECT * FROM posts`;
    return posts.rows;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getPost = async (id: string) => {
  try {
    const post = await sql`SELECT * FROM posts WHERE id = ${id}`;
    return post.rows[0];
  } catch (error) {
    console.log(error);
    return {};
  }
};
