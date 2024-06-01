"use client";

import { useEffect, useState } from "react";
import UserDropdown from "./UserDropdown";
import UserIcon from "./UserIcon";
import { deleteAuthToken, hasAuthToken } from "@/utils/actions";
import { Link } from "@/navigation";

const User = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    hasAuthToken().then((res) => setIsLoggedIn(res));
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      deleteAuthToken();
      setDropdown(false);
    }
  }, [isLoggedIn]);

  return (
    <div className="user">
      {isLoggedIn ? (
        <UserIcon dropdown={dropdown} setDropdown={setDropdown} />
      ) : (
        <Link href={"/auth"}>login</Link>
      )}
      {dropdown && <UserDropdown setIsLoggedIn={setIsLoggedIn} />}
    </div>
  );
};
export default User;
