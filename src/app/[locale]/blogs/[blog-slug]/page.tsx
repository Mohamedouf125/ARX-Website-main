import { AxiosHeaders } from "axios";
import { getData } from "@/libs/axios/server";
import { BlogType } from "@/libs/types/types";
import Script from "next/script";
import PageHero from "@/components/PageHero";
import { getTranslations } from "next-intl/server";
import LatestBlogs from "./LatestBlogs";
import { notFound } from "next/navigation";

// Change to dynamic rendering for better production handling
export const dynamic = "force-dynamic";
export const revalidate = 3600; // Revalidate every hour

// Function to sanitize HTML content - only allow text formatting tags
const sanitizeHtml = (html: string): string => {
  if (!html) return "";

  // Remove all img tags
  let sanitized = html.replace(/<img[^>]*>/gi, "");

  // Remove all a tags but keep their text content
  sanitized = sanitized.replace(/<a[^>]*>(.*?)<\/a>/gi, "$1");

  // Remove any remaining script tags
  sanitized = sanitized.replace(/<script[^>]*>.*?<\/script>/gi, "");

  // Remove any remaining style tags
  sanitized = sanitized.replace(/<style[^>]*>.*?<\/style>/gi, "");

  // Only allow specific tags: p, h1-h6, strong, b, em, i, br, div, span
  // Remove any other tags but keep their content
  sanitized = sanitized.replace(
    /<(?!\/?(p|h[1-6]|strong|b|em|i|br|div|span))[^>]*>/gi,
    ""
  );

  return sanitized;
};

// Move data fetching outside component to prevent recreation on each render
const fetchBlogData = async (blogSlug: string, locale: string) => {
  try {
    console.log(`Fetching blog data for slug: ${blogSlug}, locale: ${locale}`);

    const response = await getData(
      `blog/${blogSlug}`,
      {},
      new AxiosHeaders({
        lang: locale,
      })
    );

    console.log("Blog API response:", response);

    if (!response.data || !response.data.blog) {
      throw new Error("Blog not found in API response");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);

    // Check if it's a 404 error
    if (error && typeof error === "object" && "response" in error) {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) {
        throw new Error("BLOG_NOT_FOUND");
      }
    }

    throw error;
  }
};

// Static date formatting - no dynamic calculations
const formatDate = (dateString: string) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
};

const BlogPage = async ({
  params,
}: {
  params: Promise<{ locale: string; "blog-slug": string }>;
}) => {
  const { locale, "blog-slug": blogSlug } = await params;

  console.log(`BlogPage params - locale: ${locale}, slug: ${blogSlug}`);

  // Fetch data with error handling
  let blog: BlogType | null = null;
  let latest_blogs: BlogType[] = [];

  try {
    const data = await fetchBlogData(blogSlug, locale);
    blog = data.blog;
    latest_blogs = data.latest_blogs || [];

    if (!blog) {
      console.log("Blog is null, throwing not found");
      notFound();
    }
  } catch (error) {
    console.error("Failed to fetch blog data:", error);

    // If it's a "not found" error, use Next.js notFound()
    if (error instanceof Error && error.message === "BLOG_NOT_FOUND") {
      notFound();
    }

    // For other errors, show a more specific error page
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600">
            We&apos;re having trouble loading this blog post. Please try again
            later.
          </p>
        </div>
      </div>
    );
  }

  const t = await getTranslations("blog");

  // Sanitize the blog description
  const sanitizedDescription = sanitizeHtml(blog?.description || "");

  console.log("Blog data:", blog);

  // Generate JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blogSlug}`,
    },
    headline: blog?.title || "",
    description: (blog?.description || "")
      .replace(/<[^>]*>/g, "")
      .substring(0, 160),
    image: blog?.image || "",
    author: {
      "@type": "Person",
      name: "ARX Team",
    },
    publisher: {
      "@type": "Organization",
      name: "ARX",
      logo: {
        "@type": "ImageObject",
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
      },
    },
    datePublished: blog?.created_at || "",
    dateModified: blog?.updated_at || blog?.created_at || "",
  };

  // Pre-format the date to avoid dynamic calculations
  const formattedDate = formatDate(blog?.created_at || "");

  return (
    <div>
      <Script
        id="blog-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={t("title")}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title"), href: "/blogs" },
          { label: blog?.title || "" },
        ]}
        backgroundImage="/images/home/AxiomTower.png"
        hideDescription={true}
        height="small"
      />

      {/* Full-Width Automatic Slider */}
      <section className="bg-white relative z-10 rounded-3xl pb-30">
        <div className="max-w-7xl mx-auto overflow-hidden px-6 pt-20 ">
          <div className="head flex justify-center items-center gap-3 mb-5">
            <span className="text-[12px] font-medium text-black text-center bg-[#035B8D] text-white px-6 py-2 rounded-full">
              {blog?.category || t("category")}
            </span>

            <span className="text-[12px] font-medium text-black flex text-gray-500 font-[400]">
              {formattedDate}
            </span>
          </div>

          <div className="title mb-12">
            <h1 className="text-[30px] md:text-[45px] lg:text-[55px] font-[700] capitalize relative group/title leading-none text-center sm:px-10 lg:px-30">
              {blog?.title || ""}
            </h1>
          </div>

          {blog?.cover && (
            <img
              src={blog.cover}
              alt={blog.title || ""}
              className="w-full h-auto object-cover max-h-[80vh] rounded-lg"
              width={1920}
              height={1080}
            />
          )}
        </div>

        <div className="max-w-5xl mx-auto px-6">
          <div className="description my-16">
            <div
              className="text-gray-500 text-[18px] font-[400] space-y-3 leading-[25px] rounded-3xl prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            />
          </div>
          <hr className="text-gray-500" />
        </div>

        {/* Gallery Images with Captions */}
        <LatestBlogs blogs={latest_blogs} category={t("category")} />
      </section>
    </div>
  );
};

export default BlogPage;
