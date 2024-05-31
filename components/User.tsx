"use client";

import { useState } from "react";
import UserDropdown from "./UserDropdown";
import UserIcon from "./UserIcon";

const User = () => {
  const [dropdown, setDropdown] = useState(false);
  return (
    <div className="user">
      <UserIcon dropdown={dropdown} setDropdown={setDropdown} />
      {dropdown && <UserDropdown />}
    </div>
  );
};
export default User;
