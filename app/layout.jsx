import "../sass/main.scss";
import { getSystemPreferences } from "../utils/actions";

export const metadata = {
  title: "TBC final project🔥🔥🔥",
  description: "Final project for TBC academy",
};

export default async function RootLayout({ children }) {
  const { language, theme } = await getSystemPreferences();

  return (
    <html
      lang={language ? language : "en"}
      className={theme === "light" ? "light" : ""}
    >
      <body>{children}</body>
    </html>
  );
}
