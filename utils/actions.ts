"use server";
import { cookies } from "next/headers";

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
  const response = await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/users`);
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
  await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/users`, {
    method: "POST",
    body: JSON.stringify(user),
  });
};
// export const updateUser = async (user: User) => {
//   await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/users`, {
//     method: "PATCH",
//     body: JSON.stringify(user),
//   });
// };

export const deleteUser = async (id: number) => {
  await fetch(`${process.env.NEXT_PUBLIC_URL}api/auth/users`, {
    method: "DELETE",
    body: JSON.stringify(id),
  });
};

// new functions
export const getProducts = async (
  search = "",
  category = "all",
  sort = "",
  order = "",
  page = "1"
) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}api/v2/products?search=${search}&category=${category}&sort=${sort}&order=${order}&page=${page}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await response.json();
  return products;
};
