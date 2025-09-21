// src/i18n/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // استثناء api, _next, والملفات الثابتة
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
