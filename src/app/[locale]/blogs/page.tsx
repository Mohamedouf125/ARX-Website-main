import "/public/css/blogs.css";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { BlogType } from "@/libs/types/types";
import { getTranslations } from "next-intl/server";
import PageHero from "@/components/PageHero";
import BlogCard from "./BlogCard";
import Pagination from "./Pagination";

const BlogsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string }>;
}) => {
  const { locale } = await params;
  const { page = "1" } = await searchParams;

  const feachData = async () => {
    try {
      const response = await getData(
        "blogs",
        {
          page: page,
        },
        new AxiosHeaders({
          lang: locale,
        })
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };


  const { blogs: blogPosts, paginate } = await feachData();

  // Use pagination data from API response
  const currentPage = paginate?.current_page || 1;
  const totalPages = paginate?.last_page || 1;

  const t = await getTranslations("blog");

  return (
    <div className="min-h-screen font-lato bg-white pb-20">
      {/* Hero Section */}
      <PageHero
        title={t("title")}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title") },
        ]}
        backgroundImage="/header__blogs.webp"
        hideDescription={true}
        height="medium"
      />

      {/* Blog Posts Section */}
      <section className="mx-auto px-4 md:px-6 lg:px-8 py-20 relative z-10 rounded-3xl bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 gap-4">
            {blogPosts.map((post: BlogType) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            baseUrl={`/blogs`}
          />
        </div>
      </section>
    </div>
  );
};

export default BlogsPage;
