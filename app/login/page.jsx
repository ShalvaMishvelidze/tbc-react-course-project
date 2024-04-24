"use client";

import Login from "../../components/Login";
import Register from "../../components/Register";
import { useEffect, useState } from "react";
import { libraries } from "../../utils/constants";
import {
  getSystemPreferences,
  setSystemPreferences,
} from "../../utils/actions";
import ChangeTheme from "@/ChangeTheme";
import LanguageSelector from "@/LanguageSelector";

const getPreference = () => {
  if (window.matchMedia("(prefers-color-scheme)").media !== "not all") {
    const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkMode.matches ? "dark" : "light";
  }
};

const Auth = () => {
  const [hasAccount, setHasAccount] = useState(true);
  const [pageText, setPageText] = useState(libraries.en);
  const [loading, setLoading] = useState(true);
  const [sysPreferences, setSysPreferences] = useState({
    theme: "dark",
    language: "en",
  });

  useEffect(() => {
    setLoading(true);
    getSystemPreferences()
      .then((res) => {
        if (!res.theme) {
          const preference = getPreference();
          setSystemPreferences({
            theme: preference,
            language: res.language,
          }).then((res) => {
            console.log(res.language);
            if (res.theme === "light") {
              document.documentElement.classList.add("light");
            } else {
              document.documentElement.classList.remove("light");
            }
          });
        }
        if (res.language) {
          setPageText(libraries[res.language]);
        }
        setSysPreferences(res);
        return res;
      })
      .then((_) => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <>
      <div className="controls">
        <LanguageSelector
          lang={pageText.header.lang}
          systemPreferences={sysPreferences}
          reload
        />
        <ChangeTheme />
      </div>
      {hasAccount && <Login pageText={pageText?.auth} />}
      {hasAccount || <Register pageText={pageText?.auth} />}
      <div className="auth-container">
        {hasAccount ? (
          <p>
            {pageText.auth.loginMsg}{" "}
            <button onClick={() => setHasAccount(!hasAccount)}>
              {pageText.auth.register}
            </button>
          </p>
        ) : (
          <p>
            {pageText.auth.registerMsg}{" "}
            <button onClick={() => setHasAccount(!hasAccount)}>
              {pageText.auth.login}
            </button>
          </p>
        )}
      </div>
    </>
  );
};
export default Auth;
