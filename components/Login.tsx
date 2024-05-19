"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import Toast from "./Toast";

const Login = ({ pageText }: { pageText: { [key: string]: string } }) => {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "" });
  const [pending, setPending] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setPending(true);
    toast.info("Trying to log in the user...");
    fetch("/api/auth/login", {
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
        console.error("Failed to log in:", error);
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
        />
        <label htmlFor="password">{pageText.password}</label>
        <input
          onChange={handleChange}
          data-type="password"
          name="password"
          type="password"
        />
        <button
          className="auth-btn"
          type="submit"
          onSubmit={handleSubmit}
          disabled={pending}
        >
          {pending ? <LoadingSpinner /> : pageText.login}
        </button>
      </form>
    </>
  );
};
export default Login;
