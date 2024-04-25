import { ReactNode } from "react";
import "../sass/main.scss";
import { getSystemPreferences } from "../utils/actions";

export const metadata = {
  title: "TBC final project🔥🔥🔥",
  description: "Final project for TBC academy",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { language, theme }: { language: string; theme: string } =
    await getSystemPreferences();

  return (
    <html
      lang={language ? language : "en"}
      className={theme === "light" ? "light" : ""}
    >
      <body>{children}</body>
    </html>
  );
}
