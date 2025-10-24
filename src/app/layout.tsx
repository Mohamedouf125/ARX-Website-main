import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <html dir={locale === "ar" ? "rtl" : "ltr"} lang={locale}>
      <NextIntlClientProvider locale={locale}>
        {children}
      </NextIntlClientProvider>
    </html>
  );
}
