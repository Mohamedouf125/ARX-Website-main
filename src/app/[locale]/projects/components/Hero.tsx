"use client";

import React from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { useTranslations } from "next-intl";

interface HeroSectionProps {
  backgroundImage: string | StaticImageData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ backgroundImage }) => {
  const t = useTranslations("projects");
  return (
    <div className="relative w-full py-12 md:py-20 lg:py-25">
      {/* Background image */}
      <div className="absolute inset-0 ">
        {typeof backgroundImage === "string" ? (
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
          />
        ) : (
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-zinc-950/70"></div>
      </div>

      <div className="w-full px-4 sm:px-6 md:px-8 lg:px-16 max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-8">
          <div className="w-full max-w-3xl flex flex-col items-center gap-4 md:gap-8">
            <div className="w-full flex flex-col items-center gap-4">
              <h1 className=" tracking-tight text-center text-white text-5xl pb-4 font-['Cinzel']">
                {t("name")}
              </h1>
              <div className="w-full max-w-lg px-3 sm:px-5 py-2 sm:py-3 md:py-4 bg-white rounded-full shadow-lg flex items-center justify-between gap-2">
                <input
                  placeholder={t("search_placeholder")}
                  className="text-[clamp(0.875rem,3vw,1.25rem)] w-full border-none outline-none truncate"
                />
                <div className="flex items-center gap-2">
                  {/* Filter icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-actions-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  {/* Search icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 sm:w-5 sm:h-5 text-dark-gray"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
