import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ArrowLeftIcon } from "lucide-react";

export default function NotFound() {
  const t = useTranslations("our_team");
  const locale = useLocale();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="text-6xl font-bold text-[#dba426] mb-4">404</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {locale === "en" ? "Team Member Not Found" : "عضو الفريق غير موجود"}
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          {locale === "en"
            ? "The team member you're looking for doesn't exist or has been moved."
            : "عضو الفريق الذي تبحث عنه غير موجود أو تم نقله."}
        </p>
        <Link
          href="/our-team"
          className="inline-flex items-center gap-2 bg-[#dba426] hover:bg-black text-white px-6 py-3 rounded-lg transition-colors duration-300"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>{t("back_to_team")}</span>
        </Link>
      </div>
    </div>
  );
}
