"use client";

import { ChangeEvent, useState } from "react";
import { setSystemLanguage } from "../utils/actions";

const LanguageSelector = ({
  lang,
  systemPreferences,
  reload,
}: {
  lang: string[];
  systemPreferences: { language: string; theme: string };
  reload: boolean;
}) => {
  const [language, setLanguage] = useState(systemPreferences.language);
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    setSystemLanguage(e.target.value).then((_) => {
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
