"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = ({ pageText }) => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Failed to log in:", error);
      });
  };

  return (
    <>
      <form className="auth" onSubmit={handleSubmit}>
        <label htmlFor="username">{pageText.username}</label>
        <input
          onChange={handleChange}
          data-type="username"
          name="username"
          type="text"
        />
        <label htmlFor="password">{pageText.password}</label>
        <input
          onChange={handleChange}
          data-type="password"
          name="password"
          type="password"
        />
        <button className="auth-btn" type="submit" onSubmit={handleSubmit}>
          {pageText.login}
        </button>
      </form>
    </>
  );
};
export default Login;
