"use server";
import { cookies } from "next/headers";
import { PRODUCTS_API_URL } from "./constants";
import { POSTS_API_URL } from "./constants";

export const getProducts = async (searchString: string | undefined) => {
  try {
    const response = await fetch(
      `${PRODUCTS_API_URL}/search?q=${searchString || ""}`
    );

    const data = await response.json();
    return data.products;
  } catch (e) {
    console.log(e);
  }
};

export const getSingleProduct = async (id: string) => {
  try {
    const response = await fetch(`${PRODUCTS_API_URL}/${id}`);
    const data = await response.json();
    return data;
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
