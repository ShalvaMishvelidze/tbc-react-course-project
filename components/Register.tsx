"use client";

import { ChangeEvent } from "react";
import { useTranslations } from "next-intl";
import InputContainer from "./InputContainer";

const Register = ({ user, setUser }: any) => {
  const t = useTranslations("auth");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser(
      (prevState: {
        name: string;
        lastName: string;
        email: string;
        password: string;
        confirmPassword: string;
      }) => ({
        ...prevState,
        [e.target.dataset.type as string]: e.target.value,
      })
    );
  };

  return (
    <>
      <div className="input-container">
        <InputContainer
          t={t("name")}
          handleChange={handleChange}
          keyName={"name"}
          type={"text"}
          user={user}
          maxLength={15}
        />
        <InputContainer
          t={t("lastName")}
          handleChange={handleChange}
          keyName={"lastName"}
          type={"text"}
          user={user}
          maxLength={20}
        />
      </div>
      <InputContainer
        t={t("email")}
        handleChange={handleChange}
        keyName={"email"}
        type={"email"}
        user={user}
      />
      <div className="input-container">
        <InputContainer
          t={t("password")}
          handleChange={handleChange}
          keyName={"password"}
          type={"password"}
          user={user}
        />
        <InputContainer
          t={t("confirmPassword")}
          handleChange={handleChange}
          keyName={"confirmPassword"}
          type={"password"}
          user={user}
        />
      </div>
    </>
  );
};
export default Register;
