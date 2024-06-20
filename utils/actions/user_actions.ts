"use server";

import { sql } from "@vercel/postgres";

export const getUserRole = async (id: string) => {
  const role = await sql`SELECT role
    FROM users
    WHERE id = ${id};
    `;
  return role.rows[0]?.role;
};
