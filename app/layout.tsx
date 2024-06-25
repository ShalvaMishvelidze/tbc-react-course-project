import { ReactNode } from "react";
import "../sass/main.scss";
import { getSystemPreferences } from "../utils/actions";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export const metadata = {
  title: "Travel experience tracker🌍🌎🌏",
  description: `
  This is a travel experience tracker that allows you to 
  track your travel experiences. 
  You can add, edit, and delete your travel experiences. 
  You can also view your travel experiences on a map.
  `,
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
