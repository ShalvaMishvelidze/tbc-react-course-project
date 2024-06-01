"use client";

import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import Toast from "./Toast";
import { useTranslations } from "next-intl";

const Register = () => {
  const t = useTranslations("auth");
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
    fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "user registered successfully") {
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
        console.error("Failed to register:", error);
      });
  };

  return (
    <>
      <Toast />
      <form className="auth" onSubmit={handleSubmit}>
        <label htmlFor="username">{t("username")}</label>
        <input
          onChange={handleChange}
          data-type="username"
          name="username"
          type="text"
          value={user.username}
        />
        <label htmlFor="email">{t("email")}</label>
        <input
          onChange={handleChange}
          data-type="email"
          name="email"
          type="email"
          value={user.email}
        />
        <label htmlFor="password">{t("password")}</label>
        <input
          onChange={handleChange}
          data-type="password"
          name="password"
          type="password"
          value={user.password}
        />
        <button
          className="auth-btn"
          type="submit"
          onSubmit={handleSubmit}
          disabled={pending}
        >
          {pending ? <LoadingSpinner /> : t("register")}
        </button>
      </form>
    </>
  );
};
export default Register;
