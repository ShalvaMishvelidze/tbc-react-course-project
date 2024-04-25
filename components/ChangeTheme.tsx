"use client";

import { useEffect, useState } from "react";
import { GrSun } from "react-icons/gr";
import { BsMoonStars } from "react-icons/bs";
import { getSystemPreferences, setSystemPreferences } from "../utils/actions";

const getPreference = () => {
  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkMode.matches ? "dark" : "light";
  }
  return "dark";
};

const ChangeTheme = () => {
  const [languagePreference, setLanguagePreference] = useState("en");
  const [themePreference, setThemePreference] = useState("dark");
  const [firstFire, setFirstFire] = useState(true);

  useEffect(() => {
    getSystemPreferences()
      .then((res) => {
        if (!res.theme) {
          const preference = getPreference();
          setThemePreference(preference);
        } else {
          setThemePreference(res.theme);
        }
        return res;
      })
      .then((res) => {
        if (res.language) {
          setLanguagePreference(res.language);
        }
        return res;
      })
      .then((res) => {
        if (res.theme === "light") {
          document.documentElement.classList.add("light");
        } else {
          document.documentElement.classList.remove("light");
        }
      });
  }, []);

  const handleClick = () => {
    setThemePreference(themePreference === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    let timeout = setTimeout(() => {
      if (firstFire) {
        setFirstFire(false);
        return;
      }
    }, 2000);
    if (!firstFire) {
      setSystemPreferences({
        theme: themePreference,
        language: languagePreference,
      }).then((res) => {
        document.documentElement.classList.toggle("light");
        console.log(res, "setSystemPreferences");
        return res;
      });
    }
    return () => clearTimeout(timeout);
  }, [themePreference]);

  return (
    <button disabled={firstFire} className="change-theme" onClick={handleClick}>
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
