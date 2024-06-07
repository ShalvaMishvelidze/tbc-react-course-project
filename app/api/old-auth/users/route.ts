import { hashPassword } from "../../../../utils/functions";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(_: Request) {
  try {
    const data = await sql`SELECT * FROM users;`;
    const users = data.rows.map((user) => {
      const { id, username, email, age, role } = user;
      return { id, username, email, age, role };
    });

    return NextResponse.json(
      { msg: "Got all users successfully", data: users },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}

export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const isWithUsername =
      await sql`SELECT * FROM users where username = ${body.username};`;
    const isWithEmail =
      await sql`SELECT * FROM users where username = ${body.email};`;

    if (isWithUsername.rows.length > 0) {
      return NextResponse.json(
        { error: "user with this username already exists" },
        { status: 409 }
      );
    }

    if (isWithEmail.rows.length > 0) {
      return NextResponse.json(
        { error: "user with this email already exists" },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(body.password);

    await sql`INSERT INTO users (username, email, password, role) 
    VALUES (${body.username}, ${body.email}, ${hashedPassword}, ${body.role});`;

    return NextResponse.json(
      { msg: "Registered successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return new Response("Failed to register", {
      status: 400,
    });
  }
};

export async function PATCH(req: Request) {
  try {
    const { id, username, email, age, role } = await req.json();
    await sql`UPDATE users SET 
    username=${username},email=${email},age=${age},role=${role} WHERE id=${id};`;

    return NextResponse.json(
      { msg: "Updated user successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}
export async function DELETE(req: Request) {
  try {
    const id = await req.json();
    await sql`DELETE FROM users WHERE id=${id}`.catch((e) => console.log(e));

    return NextResponse.json(
      { msg: "Deleted user successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Failed to get users" }, { status: 500 });
  }
}
