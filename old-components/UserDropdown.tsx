import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import LoadingSpinner from "./LoadingSpinner";
import { getUserRole } from "@/utils/actions/user_actions";
import { useEffect, useState } from "react";

const UserDropdown = ({ nav }: { nav: { [key: string]: string } }) => {
  const { user, error, isLoading } = useUser();
  const [role, setRole] = useState("user");

  useEffect(() => {
    getUserRole(user?.sub as string).then((r) => setRole(r));
  }, []);

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="user-dropdown">
      <Link href="/profile">{nav.profile}</Link>
      <Link href="/my-products">{nav.myProducts}</Link>
      <Link href="/my-posts">{nav.myPosts}</Link>
      <Link href="/orders">{nav.orders}</Link>
      {role === "admin" && <Link href="/admin">{nav.admin}</Link>}
      <a href="/api/auth/logout">{nav.logout}</a>
    </div>
  );
};
export default UserDropdown;
