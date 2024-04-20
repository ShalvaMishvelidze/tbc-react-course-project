import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    const cookieStore = cookies();

    const res = await request;
    const user = await res.json();

    const username = cookieStore.get("username");
    const password = cookieStore.get("password");
    if (
      username?.value === user.username &&
      password?.value === user.password
    ) {
      const response = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "kminchelle",
          password: "0lelplR",
        }),
      });
      const data = await response.json();
      cookieStore.set("token", data.token);
    } else {
      return new Response("Invalid credentials!", { status: 401 });
    }

    return new Response("Logged in successfully!", {
      status: 200,
    });
  } catch (error) {
    return new Response("Invalid credentials!", { status: 400 });
  }
};
