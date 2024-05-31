import { Link } from "@/navigation";
import Logout from "./Logout";

const UserDropdown = () => {
  return (
    <div className="user-dropdown">
      <Link href="/profile">profile</Link>
      <Link href="/gallery">gallery</Link>
      <Logout />
    </div>
  );
};
export default UserDropdown;
