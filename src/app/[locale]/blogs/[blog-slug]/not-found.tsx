import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("blog");

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-300 mb-4">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Blog Post Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            {t("blog_not_found")}
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/blogs"
            className="inline-block bg-[#035B8D] text-white px-6 py-3 rounded-lg hover:bg-[#024a75] transition-colors duration-200"
          >
            Browse All Blogs
          </Link>

          <div>
            <Link href="/" className="text-[#035B8D] hover:underline">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
