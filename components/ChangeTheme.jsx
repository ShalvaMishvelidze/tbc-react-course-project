"use client";

import { useState } from "react";
import { GrSun } from "react-icons/gr";
import { BsMoonStars } from "react-icons/bs";

const ChangeTheme = () => {
  const [darkIcon, setDarkIcon] = useState(true);

  const handleClick = () => {
    document.documentElement.classList.toggle("dark");
    setDarkIcon(!darkIcon);
  };

  return (
    <button className="change-theme" onClick={handleClick}>
      <div className={`change-theme-icon ${darkIcon ? "active" : "inactive"}`}>
        <GrSun size={24} />
      </div>
      <div className={`change-theme-icon ${!darkIcon ? "active" : "inactive"}`}>
        <BsMoonStars size={21} />
      </div>
    </button>
  );
};
export default ChangeTheme;
