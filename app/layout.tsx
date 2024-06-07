import { ReactNode } from "react";
import "../sass/main.scss";
import { getSystemPreferences } from "../utils/actions";
import { UserProvider } from "@auth0/nextjs-auth0/client";

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
      <UserProvider>
        <body>{children}</body>
      </UserProvider>
    </html>
  );
}
