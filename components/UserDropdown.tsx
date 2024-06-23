import Link from "next/link";

const UserDropdown = () => {
  return (
    <div className="user-dropdown">
      <Link href="/profile">profile</Link>
      <Link href="/my-products">my products</Link>
      <Link href="/my-posts">my posts</Link>
      <Link href="/orders">orders</Link>
      <Link href="/admin">admin</Link>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
};
export default UserDropdown;
