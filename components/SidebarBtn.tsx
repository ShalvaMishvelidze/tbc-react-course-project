"use client";
import { MdOutlineSegment } from "react-icons/md";

const SidebarBtn = ({ setOpen, open }: any) => {
  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <button onClick={toggleSidebar} className="sidebar-btn">
      <MdOutlineSegment />
    </button>
  );
};
export default SidebarBtn;
