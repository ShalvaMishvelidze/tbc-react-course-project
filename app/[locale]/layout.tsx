import { ReactNode } from "react";
import "../../sass/main.scss";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { getThemePreferenceCookie } from "@/utils/actions";

export const metadata = {
  title: "Travel experience tracker🌍🌎🌏",
  description: `
  This is a travel experience tracker that allows you to 
  track your travel experiences. 
  You can add, edit, and delete your travel experiences. 
  You can also view your travel experiences on a map.
  `,
};

// Can be imported from a shared config
const locales = ["en", "ka"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const themePreference = await getThemePreferenceCookie();
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className={themePreference?.value}>
      <UserProvider>
        <body>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </body>
      </UserProvider>
    </html>
  );
}
