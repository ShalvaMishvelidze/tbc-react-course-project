"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import type { PutBlobResult } from "@vercel/blob";
import { toast } from "react-toastify";
import Toast from "./Toast";
import { updateUser } from "@/utils/actions/user_actions";
import LoadingSpinner from "./LoadingSpinner";

const Profile = ({ profile, user: u }: any) => {
  const [user, setUser] = useState({
    id: "id",
    name: "",
    lastname: "",
    email: "",
    image: "",
  });
  const [pending, setPending] = useState(false);

  const inputFileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUser(u);
  }, [u]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    toast.info("Saving changes...");
    setPending(true);
    let newBlob: { url: string } | undefined = undefined;
    if (inputFileRef.current?.files?.length! > 0) {
      toast.info("Uploading image...");
      const response = await fetch(
        `/api/avatar/upload?filename=${inputFileRef.current!.files![0].name}`,
        {
          method: "POST",
          headers: { id: user.id },
          body: inputFileRef.current!.files![0],
        }
      );

      newBlob = (await response.json()) as PutBlobResult;
    }

    const newUser = await updateUser(user, newBlob?.url as string);
    setUser(newUser as any);
    toast.success("Changes saved successfully!");
    setPending(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prevState) => ({
      ...prevState,
      [e.target.dataset.type as string]: e.target.value,
    }));
  };

  return (
    <>
      <Toast />
      <form className="profile" onSubmit={handleSubmit}>
        {user.image ? (
          <Image src={user.image} alt={user.name} width={500} height={500} />
        ) : (
          <LoadingSpinner />
        )}
        <label htmlFor="profile-img" className="img-label">
          {profile.changeImage}
        </label>
        <input
          type="file"
          ref={inputFileRef}
          name="profile-img"
          id="profile-img"
          onChange={(e) => {
            if (e.target.files![0].size > 1024 * 1024) {
              inputFileRef.current!.value = "";
              toast.error(
                "Image size is too big! You can only upload images up to 1MB."
              );
              return;
            } else {
              const files = e.target.files;
              if (files !== null) {
                const file = files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = function (e) {
                    if (e.target) {
                      setUser({ ...user, image: e.target.result as string });
                    }
                  };
                  reader.readAsDataURL(file);
                }
              }
            }
          }}
          className="img-input"
        />
        <div>
          <label>{profile.name}</label>
          <input
            type="text"
            data-type="name"
            onChange={handleChange}
            maxLength={50}
            value={user.name}
          />
        </div>
        <div>
          <label>{profile.lastName}</label>
          <input
            type="text"
            data-type="lastname"
            onChange={handleChange}
            maxLength={50}
            value={user.lastname}
          />
        </div>
        <div>
          <label>{profile.email}</label>
          <input
            type="text"
            data-type="email"
            onChange={handleChange}
            maxLength={50}
            value={user.email}
          />
        </div>
        <button type="submit" onSubmit={handleSubmit} disabled={pending}>
          {profile.save}
        </button>
      </form>
    </>
  );
};

export default Profile;
