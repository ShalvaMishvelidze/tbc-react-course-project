"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import Login from "@/components/Login";
import Register from "@/components/Register";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { toast } from "react-toastify";

const Auth = () => {
  const t = useTranslations("auth");
  const [isRegistered, setIsRegistered] = useState(true);
  const [pending, setPending] = useState(false);
  const [loginUser, setLoginUser] = useState({ email: "", password: "" });
  const [registerUser, setRegisterUser] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const router = useRouter();

  function handleLogin(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    toast.info("Trying to log in the user...");
    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(loginUser),
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
  }

  function handleRegister(e: FormEvent) {
    e.preventDefault();
    setPending(true);
    toast.info("Trying to register user...");
    fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(registerUser),
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
  }

  return (
    <section className="auth-container">
      <form
        className="auth"
        onSubmit={isRegistered ? handleLogin : handleRegister}
      >
        {isRegistered ? (
          <Login user={loginUser} setUser={setLoginUser} />
        ) : (
          <Register user={registerUser} setUser={setRegisterUser} />
        )}
        <button
          className="auth-btn"
          type="submit"
          onSubmit={isRegistered ? handleLogin : handleRegister}
          disabled={pending}
        >
          {pending ? (
            <LoadingSpinner />
          ) : isRegistered ? (
            t("login")
          ) : (
            t("register")
          )}
        </button>
      </form>

      {isRegistered ? (
        <p>
          {t("loginMsg")}{" "}
          <button
            className="auth-container-btn"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {t("register")}
          </button>
        </p>
      ) : (
        <p>
          {t("registerMsg")}{" "}
          <button
            className="auth-container-btn"
            onClick={() => setIsRegistered(!isRegistered)}
          >
            {t("login")}
          </button>
        </p>
      )}
    </section>
  );
};
export default Auth;
