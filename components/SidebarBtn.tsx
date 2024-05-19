"use client";
import { MdOutlineSegment } from "react-icons/md";

const SidebarBtn = () => {
  let sidebar: HTMLElement | null = null;
  if (typeof document !== "undefined") {
    sidebar = document.querySelector(".sidebar");
  }

  const toggleSidebar = () => {
    sidebar?.classList.toggle("sidebar-open");
  };

  return (
    <button onClick={toggleSidebar} className="sidebar-btn">
      <MdOutlineSegment />
    </button>
  );
};
export default SidebarBtn;
