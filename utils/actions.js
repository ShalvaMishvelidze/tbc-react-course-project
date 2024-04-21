"use server";
import { PRODUCTS_API_URL } from "./constants";
import { POSTS_API_URL } from "./constants";

export const getProducts = async (searchString) => {
  try {
    const response = await fetch(
      `${PRODUCTS_API_URL}/search?q=${searchString || ""}`
    );
    const data = await response.json();
    return data.products;
  } catch (e) {
    console.log(error);
  }
};

export const getSingleProduct = async (id) => {
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

export const getSinglePost = async (id) => {
  try {
    const response = await fetch(`${POSTS_API_URL}/${id}`);
    const data = await response.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};
