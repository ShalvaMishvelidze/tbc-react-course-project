"use client";

import { useEffect, useState } from "react";
import { GrSun } from "react-icons/gr";
import { BsMoonStars } from "react-icons/bs";
import {
  getThemePreferenceCookie,
  setThemePreferenceCookie,
} from "@/utils/actions";

const getPreference = () => {
  if (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-color-scheme)").media !== "not all"
  ) {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    setThemePreferenceCookie(prefersDarkMode.matches ? "dark" : "light");
    return prefersDarkMode.matches ? "dark" : "light";
  }
  return "dark";
};

const ChangeTheme = () => {
  const [themePreference, setThemePreference] = useState("");

  const handleClick = () => {
    setThemePreferenceCookie(themePreference === "dark" ? "light" : "dark");
    setThemePreference(themePreference === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    getThemePreferenceCookie().then((res) => {
      if (res) {
        setThemePreference(res.value);
      } else {
        setThemePreference(getPreference());
      }
    });
  }, []);

  useEffect(() => {
    if (themePreference === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
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
