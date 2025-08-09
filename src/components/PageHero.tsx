"use client";

import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs: BreadcrumbItem[];
  backgroundImage?: string;
  height?: "small" | "medium" | "large";
  showDescription?: boolean;
  showSearch?: boolean;
  searchPlaceholder?: string;
  hideDescription?: boolean;
  onSearchChange?: (value: string) => void;
}

const PageHero: React.FC<PageHeroProps> = ({
  title,
  breadcrumbs,
  backgroundImage = "/images/home/banner1.png",
  height = "medium",
  hideDescription = false,
  description,
}) => {
  const t = useTranslations("second_hero");

  const heightClasses = {
    small: "h-[35vh] md:h-[45vh]",
    medium: "h-[45vh] md:h-[65vh]",
    large: "h-[60vh] md:h-[80vh]",
  };

  return (
    <section
      className={`relative ${heightClasses[height]} w-full bg-cover bg-center z-[0]`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute bottom-0 left-0 w-full h-full bg-black/50 z-0"></div>

      {/* Content */}
      <div className="z-10 relative h-full">
        {/* // Standard layout with breadcrumbs */}
        <div className="absolute inset-0 flex flex-col items-start justify-between pt-30 md:pt-40 pb-30 mb-[-50px] px-3 md:px-8 w-full z-10">
          {/* Title */}
          <h1 className="text-[30px] sm:text-[50px] md:text-[70px] font-bold font-['Cinzel'] mb-4 text-white">
            {title}
          </h1>

          {/* Bottom section with breadcrumbs and description */}
          <div className="bottom flex items-end justify-between w-full">
            {/* Breadcrumbs */}
            <div className="breadcrumbs z-10">
              <ul className="flex items-center flex-wrap">
                {breadcrumbs.map((item, index) => (
                  <li
                    key={index}
                    className="flex items-center text-[15px] font-[600] opacity-70 hover:opacity-100 transition-all duration-300 ease-in-out"
                  >
                    {index > 0 && (
                      <div className="w-[3px] h-[3px] bg-white rounded-full mx-3"></div>
                    )}
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="text-white transition-colors hover:text-[#dba426]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-white hover:text-[#dba426] transition-colors">
                        {item.label}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Description */}
            {!hideDescription && (
              <p className="text-[20px] font-[600] text-white font-['Lato'] w-[400px] opacity-60 hidden md:block">
                {description ?? t("description")}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;
