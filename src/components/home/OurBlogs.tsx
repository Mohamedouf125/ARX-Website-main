// pages/ProjectAndBlog.tsx
"use client";

import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { BlogType } from "@/libs/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { AnimatedElement } from "../animations/AnimationType";
import SmallHeadSpan from "../SharedComponent/SmallHeadSpan";
import SectionButton from "../SharedComponent/SectionButton";

const OurBlogs = ({ blogs }: { blogs: BlogType[] }) => {
  const t = useTranslations("home");
  const tBlog = useTranslations("blog");
  const locale = useLocale();

  return (
    <div className="space-y-24 pt-20 max-w-6xl mx-auto overflow-hidden">
      {/* ---------------------------- */}
      {/* Blog Section */}
      {/* ---------------------------- */}
      <section className="container mx-auto px-4">
        <div className="mb-14 flex flex-col lg:flex-row justify-between lg:items-end gap-5">
          <div className="max-w-2xl flex flex-col items-start">
            <div className="cover">
              <SmallHeadSpan>{t("our_blog")}</SmallHeadSpan>
            </div>

            <AnimatedElement
              type="slideLeft"
              duration={1}
              className="w-full h-full"
            >
              <h2
                className="font-[Cinzel] text-3xl lg:text-5xl font-bold uppercase leading-[1.2] tracking-tight"
                dangerouslySetInnerHTML={{
                  __html: t("discover_inspiration_and_trends"),
                }}
              />
            </AnimatedElement>
          </div>

          <div className="flex justify-end items-center">
            <AnimatedElement
              type="slideRight"
              duration={1}
              className="w-full h-full"
            >
              <SectionButton 
                href={`${locale}/blogs`}
              >
                {t("view_all")}
              </SectionButton>
            </AnimatedElement>
          </div>
        </div>

        <div className="relative">
          <AnimatedElement
            type="slideUp"
            duration={1.5}
            className="w-full h-full"
          >
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={24}
              slidesPerView={3}
              loop
              breakpoints={{
                0: {
                  slidesPerView: 1,
                  spaceBetween: 10,
                },
                640: {
                  slidesPerView: 2.5,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 24,
                },
              }}
            >
              {blogs?.map((post: BlogType, index: number) => (
                <SwiperSlide key={index} className="group">
                  <div className="relative w-full">
                    <div className="media w-full h-60 rounded-3xl overflow-hidden mb-5">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="object-cover w-full h-full -translate-x-6 scale-[1.2] transition-all duration-300 ease-in-out group-hover:translate-x-0"
                      />
                    </div>
                    <div className="">
                      <div className="head grid grid-cols-3 items-center gap-5 mb-4">
                        <span className="text-[12px] font-medium text-black text-center bg-[#dba426] text-white px-1 py-2 rounded-full w-full">
                          {tBlog("category")}
                        </span>

                        <span className="w-full h-[1px] bg-gray-300 block flex justify-center"></span>

                        <span className="text-[12px] font-medium text-black flex  text-gray-500 font-[400]">
                          March 18, 2025
                        </span>
                      </div>
                      <div className="inline-block group">
                        <Link
                          href={`/blogs/${post.slug}`}
                          className="text-black no-underline text-lg font-[700] font-[Cinzel] capitalize relative group/title leading-none"
                          style={{
                            backgroundImage:
                              "linear-gradient(to right, #035B8D, #035B8D)",
                            backgroundSize: "0% 2px",
                            backgroundPosition: "0 100%",
                            backgroundRepeat: "no-repeat",
                            transition: "background-size 0.3s ease-out",
                            display: "inline",
                            boxDecorationBreak: "clone",
                            WebkitBoxDecorationBreak: "clone",
                            paddingBottom: "2px",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundSize = "100% 2px";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundSize = "0% 2px";
                          }}
                        >
                          {post.title}
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
};

export default OurBlogs;
