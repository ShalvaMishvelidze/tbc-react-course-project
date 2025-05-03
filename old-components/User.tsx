"use client";
import { useState, useEffect, useRef } from "react";
import UserDropdown from "./UserDropdown";
import UserIcon from "./UserIcon";
import { useUser } from "@auth0/nextjs-auth0/client";
import LoadingSpinner from "./LoadingSpinner";

const User = ({ nav }: { nav: { [key: string]: string } }) => {
  const { user, error, isLoading } = useUser();
  const [dropdown, setDropdown] = useState(false);
  const node: any = useRef();

  useEffect(() => {
    // Function to check if click is outside of ref
    if (typeof window !== undefined) {
      const handleClickOutside = (e: any) => {
        if (node.current?.contains(e.target)) {
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

  if (error || isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      {user ? (
        <div className="user" ref={node}>
          <UserIcon dropdown={dropdown} setDropdown={setDropdown} />
          {dropdown && <UserDropdown nav={nav} />}
        </div>
      ) : (
        <a className="user-login" href="/api/auth/login">
          {nav.login}
        </a>
      )}
    </>
  );
};

export default User;
