"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const Login = ({ pageText }: { pageText: { [key: string]: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
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
