"use server";
// import { redirect } from "next/navigation";
import { PRODUCTS_API_URL } from "./constants";
import { POSTS_API_URL } from "./constants";
import { cookies } from "next/headers";

export const register = async (user) => {
  const userData = {
    username: user.get("username"),
    password: user.get("password"),
  };

  const res = await fetch("https://dummyjson.com/users/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName: userData.username,
      lastName: "Ovi",
      age: 250,
      password: userData.password,
    }),
  });
  const info = await res.json();

  cookies().set("username", info.firstName);
  cookies().set("password", info.password);

  const response = await fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
    }),
  });
  const data = await response.json();
  cookies().set("token", data.token);
};

export const login = async (user) => {
  const userData = {
    username: user.get("username"),
    password: user.get("password"),
  };

  const username = cookies().get("username");
  const password = cookies().get("password");

  if (
    username?.value === userData.username &&
    password?.value === userData.password
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
    cookies().set("token", data.token);
  } else {
    console.error("Invalid credentials!");
  }
};

export const logout = async () => {
  cookies().delete("token");
};

// just in case
// export const clearUser = async () => {
//   cookies().delete("token");
//   cookies().delete("username");
//   cookies().delete("password");
// };

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

// some functions that need refactoring

// const sortProducts = () => {
//   if (sortStatus === "sorted") {
//     setSortedProducts([...products]);
//     setSortStatus("cleared");
//     return;
//   }

//   setSortedProducts((_) => {
//     setSortStatus("sorted");
//     if (sort === "a-z") {
//       return [...products].sort((a, b) => a.title.localeCompare(b.title));
//     }
//     if (sort === "z-a") {
//       return [...products].sort((a, b) => b.title.localeCompare(a.title));
//     }
//     if (sort === "price-ascending") {
//       return [...products].sort((a, b) => a.price - b.price);
//     }
//     if (sort === "price-descending") {
//       return [...products].sort((a, b) => b.price - a.price);
//     }
//   });
// };

// const getProducts = async (searchString) => {
//   setLoading(true);
//   try {
//     const response = await fetch(
//       `${api_url}/search?q=${searchString || search}`
//     );
//     const data = await response.json();
//     setProducts([...data.products]);
//     setLoading(false);
//   } catch (e) {
//     setLoading(true);
//     console.error(e);
//   }
// };

// const handleChange = (e) => {
//   setSort((_) => {
//     setSortStatus("updated");
//     return e.target.value;
//   });
// };
