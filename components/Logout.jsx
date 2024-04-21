"use client";
import { useRouter } from "next/navigation";
import { IoLogOut } from "react-icons/io5";

const Logout = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
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
