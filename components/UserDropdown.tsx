import Link from "next/link";

const UserDropdown = ({ nav }: { nav: { [key: string]: string } }) => {
  return (
    <div className="user-dropdown">
      <Link href="/profile">{nav.profile}</Link>
      <Link href="/my-products">{nav.myProducts}</Link>
      <Link href="/my-posts">{nav.myPosts}</Link>
      <Link href="/orders">{nav.orders}</Link>
      <Link href="/admin">{nav.admin}</Link>
      <a href="/api/auth/logout">{nav.logout}</a>
    </div>
  );
};
export default UserDropdown;
