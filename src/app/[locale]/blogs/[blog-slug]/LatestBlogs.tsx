"use client";

import { memo } from "react";
import { BlogType } from "@/libs/types/types";
import HoverLink from "./HoverLink";
import { useLocale } from "next-intl";
import Link from "next/link";

interface LatestBlogsProps {
  blogs: BlogType[];
  category: string;
}

const LatestBlogs = memo(({ blogs, category }: LatestBlogsProps) => {
  const locale =useLocale();
  if (!blogs || blogs.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 max-w-7xl mx-auto px-6">
      {blogs.map((src: BlogType, idx: number) => (
        <div className="relative w-full" key={`${src.slug}-${idx}`}>
          <Link href={`/${locale}/blogs/${src.slug}`}>
          <div className="media w-full h-60 rounded-3xl overflow-hidden mb-5">
            <img
              src={src.image}
              alt={src.title}
              className="object-cover w-full h-full -translate-x-6 scale-[1.2] transition-all duration-300 ease-in-out group-hover:translate-x-0"
              loading="lazy"
            />
          </div>
          </Link>
          <div className="">
            <div className="head grid grid-cols-3 items-center gap-5 mb-4">
              <span className="text-[12px] font-medium text-black text-center bg-[#035B8D] text-white px-1 py-2 rounded-full w-full">
                {category}
              </span>

              <span className="w-full h-[1px] bg-gray-300 block flex justify-center"></span>

              <span className="text-[12px] font-medium text-black flex  text-gray-500 font-[400]">
                March 18, 2025
              </span>
            </div>
            <div className="inline-block group">
              <HoverLink href={`/${locale}/blogs/${src.slug}`} title={src.title} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

LatestBlogs.displayName = "LatestBlogs";

export default LatestBlogs;
