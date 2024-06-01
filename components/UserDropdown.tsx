import { Link } from "@/navigation";
import Logout from "./Logout";

const UserDropdown = ({ setIsLoggedIn }: any) => {
  return (
    <div className="user-dropdown">
      <Link href="/profile">profile</Link>
      <Link href="/gallery">gallery</Link>
      <Logout setIsLoggedIn={setIsLoggedIn} />
    </div>
  );
};
export default UserDropdown;
