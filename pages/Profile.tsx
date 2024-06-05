"use client";
import InputContainer from "@/components/InputContainer";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { useUser } from "@auth0/nextjs-auth0/client";

const Profile = () => {
  const [user, setUser] = useState({
    id: "id",
    name: "",
    lastname: "",
    email: "",
    image: "",
  });
  const { user: sesUser, error, isLoading } = useUser();
  console.log(sesUser);

  if (isLoading) {
    return <div className="loading">loading</div>;
  }

  if (error) {
    return <div className="error">error</div>;
  }

  const fetchUser = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}api/user/getUser`,
      {
        method: "GET",
        headers: { id: sesUser?.sub as string },
      }
    );
    const data = await response.json();
    setUser(data.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const t = useTranslations("auth");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_URL}api/user/updateProfile`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        id: user.id,
      },
      body: JSON.stringify(user),
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  const inputFileRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          if (!inputFileRef.current?.files) {
            throw new Error("No file selected");
          }

          const file = inputFileRef.current.files[0];

          const response = await fetch(
            `/api/avatar/upload?filename=${file.name}`,
            {
              method: "POST",
              headers: { id: user.id },
              body: file,
            }
          );

          const newBlob = (await response.json()) as PutBlobResult;

          setUser((prevState) => ({
            ...prevState,
            image: newBlob.url,
          }));
        }}
      >
        <Image src={user.image} alt={user.name} width={150} height={150} />
        <label htmlFor="profile-img">change image</label>
        <input
          type="file"
          ref={inputFileRef}
          name="profile-img"
          id="profile-img"
          required
        />
        <button type="submit">submit</button>
      </form>
      <form className="profile" onSubmit={handleSubmit}>
        <InputContainer
          t={t("name")}
          handleChange={handleChange}
          keyName={"name"}
          type={"text"}
          user={user}
          maxLength={15}
        />
        <InputContainer
          t={t("lastname")}
          handleChange={handleChange}
          keyName={"lastname"}
          type={"text"}
          user={user}
          maxLength={20}
        />
        <InputContainer
          t={t("email")}
          handleChange={handleChange}
          keyName={"email"}
          type={"email"}
          user={user}
        />
        <button type="submit" onSubmit={handleSubmit}>
          {t("save")}
        </button>
      </form>
    </>
  );
};

export default Profile;
