"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

const Register = ({
  pageText,
}: {
  pageText: {
    [key: string]: string;
  };
}) => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "user",
  });
  0;
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then(() => {
        router.push("/");
      })
      .catch((error) => {
        console.error("Failed to register:", error);
      });
  };

  return (
    <form className="auth" onSubmit={handleSubmit}>
      <label htmlFor="username">{pageText.username}</label>
      <input
        onChange={handleChange}
        data-type="username"
        name="username"
        type="text"
        value={user.username}
      />
      <label htmlFor="email">{pageText.email}</label>
      <input
        onChange={handleChange}
        data-type="email"
        name="email"
        type="email"
        value={user.email}
      />
      <label htmlFor="password">{pageText.password}</label>
      <input
        onChange={handleChange}
        data-type="password"
        name="password"
        type="password"
        value={user.password}
      />
      <div className="auth-radio-container">
        <label>{pageText.user}</label>
        <input
          type="radio"
          name="role"
          value="user"
          onChange={handleChange}
          data-type="role"
          checked={user.role === "user"}
        />
        <label>{pageText.admin}</label>
        <input
          type="radio"
          name="role"
          value="admin"
          onChange={handleChange}
          data-type="role"
        />
      </div>
      <button className="auth-btn" type="submit" onSubmit={handleSubmit}>
        {pageText.register}
      </button>
    </form>
  );
};
export default Register;
