"use client";
import { useRouter } from "next/navigation";

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
    <form onSubmit={handleSubmit}>
      <button type="submit" onSubmit={handleSubmit}>
        log out
      </button>
    </form>
  );
};
export default Logout;
