"use client";

import Login from "@/components/Login";
import Register from "@/components/Register";
import { useTranslations } from "next-intl";
import { useState } from "react";

const Auth = () => {
  const t = useTranslations("auth");
  const [isRegistered, setIsRegistered] = useState(true);
  return (
    <section className="auth-container">
      {isRegistered ? <Login /> : <Register />}
      {isRegistered ? (
        <p>
          {t("loginMsg")}{" "}
          <button onClick={() => setIsRegistered(!isRegistered)}>
            {t("register")}
          </button>
        </p>
      ) : (
        <p>
          {t("registerMsg")}{" "}
          <button onClick={() => setIsRegistered(!isRegistered)}>
            {t("login")}
          </button>
        </p>
      )}
    </section>
  );
};
export default Auth;
