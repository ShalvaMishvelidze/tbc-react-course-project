"use client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { IoLogOut } from "react-icons/io5";

const Logout = () => {
  const router = useRouter();
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    fetch("/api/auth/logout")
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };

  return (
    <form className="logout" onSubmit={handleSubmit}>
      <button type="submit" onSubmit={handleSubmit}>
        <IoLogOut size={36} />
      </button>
    </form>
  );
};
export default Logout;
