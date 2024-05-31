"use client";

import { useEffect, useState } from "react";
import { GrSun } from "react-icons/gr";
import { BsMoonStars } from "react-icons/bs";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const getPreference = () => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme)").media !== "not all"
  ) {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkMode.matches ? "dark" : "light";
  }
  return "dark";
};

const ChangeTheme = () => {
  const [theme, setTheme] = useLocalStorage("theme", getPreference());
  const [themePreference, setThemePreference] = useState(theme);

  const handleClick = () => {
    setThemePreference(themePreference === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setTheme(themePreference);
    if (themePreference === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  }, [themePreference]);

  return (
    <button className="change-theme" onClick={handleClick}>
      <div
        className={`change-theme-icon ${
          themePreference === "dark" ? "active" : "inactive"
        }`}
      >
        <GrSun size={24} />
      </div>
      <div
        className={`change-theme-icon ${
          themePreference !== "dark" ? "active" : "inactive"
        }`}
      >
        <BsMoonStars size={21} />
      </div>
    </button>
  );
};
export default ChangeTheme;
