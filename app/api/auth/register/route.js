import { cookies } from "next/headers";

export const POST = async (request) => {
  try {
    const cookieStore = cookies();
    const clientRes = await request;
    const user = await clientRes.json();

    const res = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName: user.username,
        lastName: "Ovi",
        age: 250,
        email: user.email,
        password: user.password,
      }),
    });
    const fetchedUser = await res.json();

    cookieStore.set("username", fetchedUser.firstName);
    cookieStore.set("password", fetchedUser.password);

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

    return new Response("Registered successfully!", {
      status: 201,
    });
  } catch (error) {
    return new Response("Failed to register", {
      status: 400,
    });
  }
};
