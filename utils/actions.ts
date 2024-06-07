"use server";
import { cookies } from "next/headers";
import {
  // PRODUCTS_API_URL,
  User,
} from "./constants";
import { POSTS_API_URL } from "./constants";

export const getProducts = async () =>
  // searchString: string | undefined
  {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL as string}api/products`
      );

      const data = await response.json();
      console.log(data.data[0]);

      return data.data;
    } catch (e) {
      console.log(e);
    }
  };

export const getSingleProduct = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_VERCEL_URL as string}/api/product`,
      {
        method: "POST",
        body: JSON.stringify({ id: id }),
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (e) {
    console.error(e);
  }
};

export const getPosts = async () => {
  try {
    const response = await fetch(POSTS_API_URL);
    const data = await response.json();
    return data.posts;
  } catch (e) {
    console.error(e);
  }
};

export const getSinglePost = async (id: string) => {
  try {
    const response = await fetch(`${POSTS_API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

export const getSystemPreferences = async () => {
  const cookieStore = cookies();
  const theme = cookieStore.get("theme");
  const language = cookieStore.get("language");

  return {
    theme: theme ? theme.value : "",
    language: language ? language.value : "en",
  };
};

export const setSystemPreferences = async (preferences: {
  theme: string;
  language: string;
}) => {
  const cookieStore = cookies();
  cookieStore.set("theme", preferences.theme);
  cookieStore.set("language", preferences.language);
  const theme = cookieStore.get("theme");
  const language = cookieStore.get("language");

  return {
    theme: theme?.value,
    language: language ? language.value : "en",
  };
};

export const setSystemLanguage = async (language: string) => {
  const { theme } = await getSystemPreferences();
  await setSystemPreferences({ language, theme });
};

export const getUsers = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL}api/auth/users`
  );
  const data = await response.json();
  return data.data;
};
export const addUser = async (user: {
  id: number;
  username: string;
  email: string;
  age: number;
  role: string;
  password: string;
}) => {
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}api/auth/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
};
export const updateUser = async (user: User) => {
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}api/auth/users`, {
    method: "PATCH",
    body: JSON.stringify(user),
  });
};

export const deleteUser = async (id: number) => {
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}api/auth/users`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

export const setCartTotalCookie = async () =>
  // total: number
  {
    // const cookieStore = cookies();
    // cookieStore.set("cart_total", total.toString());
  };

export const changeQuantity = async (
  user_id: string,
  id: number,
  method: string
) => {
  // const token: any = cookies().get("token");
  const result = await fetch(
    `${process.env.NEXT_PUBLIC_VERCEL_URL as string}api/cart`,
    {
      method: "PATCH",
      body: JSON.stringify({ id: id, method: method }),
      headers: {
        id: user_id,
        // Authorization: `${token.value}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await result.json();

  return data;
};

export const emptyCart = async (id: string) => {
  // const token: any = cookies().get("token");
  await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL as string}api/cart`, {
    method: "DELETE",
    headers: {
      id,
      // Authorization: `${token.value}`,
      "Content-Type": "application/json",
    },
  });
};
