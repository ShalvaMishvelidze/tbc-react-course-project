import Link from "next/link";

const UserDropdown = () => {
  return (
    <div className="user-dropdown">
      <Link href="/profile">profile</Link>
      <Link href="/gallery">gallery</Link>
      <Link href="/my-products">my products</Link>
      <Link href="/my-posts">my posts</Link>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
};
export default UserDropdown;
