"use client";
import { useRouter } from "next/navigation";
import { logout } from "../utils/actions";

const Logout = () => {
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    logout()
      .then(() => {
        router.push("/login");
      })
      .catch((error) => {
        console.error("Failed to sign out:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" onSubmit={handleSubmit}>
        log out
      </button>
    </form>
  );
};
export default Logout;
