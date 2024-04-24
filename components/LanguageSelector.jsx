"use client";

import { useState } from "react";
import { getSystemPreferences, setSystemPreferences } from "../utils/actions";

const LanguageSelector = ({ lang, systemPreferences, reload }) => {
  const [language, setLanguage] = useState(systemPreferences.language);
  const handleChange = (e) => {
    setLanguage(e.target.value);
    getSystemPreferences()
      .then((systemPreferences) => {
        setSystemPreferences({
          language: e.target.value,
          theme: systemPreferences.theme,
        });
      })
      .then((_) => {
        if (reload) {
          location.reload();
        }
      });
  };
  return (
    <select
      onChange={handleChange}
      value={language}
      className="language-selector"
    >
      <option value="en">{lang[0]}</option>
      <option value="ka">{lang[1]}</option>
    </select>
  );
};
export default LanguageSelector;
