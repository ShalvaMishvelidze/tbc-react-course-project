"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";

const Register = ({
  pageText,
}: {
  pageText: {
    [key: string]: string;
  };
}) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
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
    setPending(true);
    toast.info("Trying to register user...");
    fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg) {
          toast.success(res.msg);
        }
        if (res.error) {
          toast.error(res.error);
          setPending(false);
          return;
        }

        setPending(false);
        router.push("/");
      })
      .catch((error) => {
        console.error("Failed to register:", error);
      });
  };

  return (
    <>
      <Toast />
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
        <button
          className="auth-btn"
          type="submit"
          onSubmit={handleSubmit}
          disabled={pending}
        >
          {pending ? <LoadingSpinner /> : pageText.register}
        </button>
      </form>
    </>
  );
};
export default Register;
