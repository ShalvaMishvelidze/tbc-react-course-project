"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import Toast from "./Toast";
import { useTranslations } from "next-intl";

const Login = () => {
  const router = useRouter();
  const t = useTranslations("auth");
  const [user, setUser] = useState({ email: "", password: "" });
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
    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "User logged in successfully") {
          toast.success(res.msg);
          setPending(false);
          router.push("/");
        }
        if (res.error) {
          toast.error(res.error);
          setPending(false);
          return;
        }
      })
      .catch((error) => {
        console.error("Failed to log in:", error);
      });
  };

  return (
    <>
      <Toast />
      <form className="auth" onSubmit={handleSubmit}>
        <label htmlFor="email">{t("email")}</label>
        <input
          onChange={handleChange}
          data-type="email"
          name="email"
          type="text"
        />
        <label htmlFor="password">{t("password")}</label>
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
          {pending ? <LoadingSpinner /> : t("login")}
        </button>
      </form>
    </>
  );
};
export default Login;
