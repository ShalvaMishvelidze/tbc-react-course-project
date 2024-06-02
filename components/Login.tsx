"use client";

import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import InputContainer from "./InputContainer";

const Login = ({ user, setUser }: any) => {
  const t = useTranslations("auth");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState: { email: string; password: string }) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  return (
    <>
      <InputContainer
        t={t("email")}
        handleChange={handleChange}
        keyName={"email"}
        type={"email"}
        user={user}
      />
      <InputContainer
        t={t("password")}
        handleChange={handleChange}
        keyName={"password"}
        type={"password"}
        user={user}
      />
    </>
  );
};
export default Login;
