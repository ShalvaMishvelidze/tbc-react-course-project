"use server";

import { sql } from "@vercel/postgres";

export const getUser = async (id: string) => {
  const user = await sql`SELECT * FROM users WHERE id = ${id}`;
  return user.rows[0];
};

export const getUserRole = async (id: string) => {
  const role = await sql`SELECT role
    FROM users
    WHERE id = ${id};
    `;
  return role.rows[0]?.role ? role.rows[0].role : "user";
};

export const updateUser = async (user: any, url: string) => {
  const newUser = await sql`UPDATE users
    SET name = ${user.name},
    lastname = ${user.lastname},
    email = ${user.email},
    image = ${url ? url : user.image}
    WHERE id = ${user.id} 
    RETURNING *;`;

  return newUser.rows[0];
};
