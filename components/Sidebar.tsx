"use client";

import { useState } from "react";
import SidebarBtn from "./SidebarBtn";
import Link from "next/link";

const Sidebar = ({ nav }: { nav: { [key: string]: string } }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <SidebarBtn setOpen={setOpen} open={open} />
      {open && (
        <aside className={open ? "sidebar sidebar-open" : "sidebar"}>
          <Link className="nav-link" href={"/"}>
            {nav.home}
          </Link>
          <Link className="nav-link" href={"/store"}>
            {nav.store}
          </Link>
          <Link className="nav-link" href={"/blog"}>
            {nav.blog}
          </Link>
          <Link className="nav-link" href={"/premium"}>
            {nav.tours}
          </Link>
          <Link className="nav-link" href={"/contact"}>
            {nav.contact}
          </Link>
        </aside>
      )}
    </>
  );
};
export default Sidebar;
