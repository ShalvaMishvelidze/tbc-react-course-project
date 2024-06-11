"use client";
import { useState, useEffect, useRef } from "react";
import UserDropdown from "./UserDropdown";
import { useUser } from "@auth0/nextjs-auth0/client";
import UserIcon from "./UserIcon";

const User = () => {
  const { user, error, isLoading } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const node: any = useRef();

  useEffect(() => {
    // Function to check if click is outside of ref
    if (typeof window !== undefined) {
      const handleClickOutside = (e: any) => {
        if (node.current.contains(e.target)) {
          // Inside click
          return;
        }
        // Outside click
        setDropdown(false);
      };

      // Add the outside click checker to the event listener
      document.addEventListener("mousedown", handleClickOutside);

      // Cleanup
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
    return;
  }, []);

  if (isLoading)
    return (
      <div className="user-loading">
        <div></div>
      </div>
    );
  if (error) return <div>{error.message}</div>;

  return (
    <div className="user" ref={node}>
      {user ? (
        <UserIcon dropdown={dropdown} setDropdown={setDropdown} />
      ) : (
        <a href="/api/auth/login">Login</a>
      )}
      {dropdown && <UserDropdown />}
    </div>
  );
};

export default User;
