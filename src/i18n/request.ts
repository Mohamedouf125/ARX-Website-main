import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

// استخراج نوع اللغات المدعومة
type Locale = (typeof routing.locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // انتظار قيمة اللغة من Promise
  const locale = await requestLocale;

  // التحقق من أن اللغة المحددة مدعومة، وإلا يتم استخدام اللغة الافتراضية
  const validatedLocale: Locale = routing.locales.includes(locale as Locale)
    ? (locale as Locale)
    : (routing.defaultLocale as Locale);

  return {
    locale: validatedLocale,
    messages: (await import(`../../messages/${validatedLocale}.json`)).default,
  };
});
