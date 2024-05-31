"use client";

import { usePathname, useRouter } from "@/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useState } from "react";

const LanguageSelector = () => {
  const t = useTranslations("nav");
  const l = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [locale, setLocale] = useState(l);
  const [dropdown, setDropdown] = useState(false);

  useEffect(() => {
    router.push(pathname, { locale: locale });
  }, [locale]);

  return (
    <div className="language-selector">
      <button className="language" onClick={() => setDropdown(!dropdown)}>
        {locale === "en" ? "English" : "Georgian"}
      </button>
      {dropdown && (
        <div className="dropdown">
          <button
            onClick={() => {
              setLocale("en");
              setDropdown(false);
            }}
            className="language-option"
          >
            {t("english")}
          </button>
          <button
            onClick={() => {
              setLocale("ka");
              setDropdown(false);
            }}
            className="language-option"
          >
            {t("georgian")}
          </button>
        </div>
      )}
    </div>
  );
};
export default LanguageSelector;
