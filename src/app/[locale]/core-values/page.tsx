"use client";
import React from "react";

import { useLocale, useTranslations } from "next-intl";
import PageHero from "@/components/PageHero";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import OurValues from "./OurValues";
import { AnimatedElement } from "@/components/animations/AnimationType";

const CoreValuesPage = () => {
  const t = useTranslations("core_values");
  const locale = useLocale();

  return (
    <div className="text-gray-800 mx-auto overflow-hidden z-10 relative bg-white w-full rounded-b-3xl">
      {/* Hero Section */}
      <PageHero
        title={t("page_title")}
        // description={t("description")}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("page_title") },
        ]}
        backgroundImage="/images/home/core-bc.jpg"
        height="medium"
      />

      <div className="rounded-t-3xl bg-white flex flex-col items-center px-6 mx-auto relative z-10 py-30">
        {/* VISION / MISSION / VALUES */}

        <section className="grid grid-cols-1 md:grid-cols-3 pt-20 pb-20 gap-5 font-[sans-serif] max-w-7xl">
          {/* Left Section */}
          <div className="left-section col-span-1">
            <SmallHeadSpan>{t("what_makes_us_different")}</SmallHeadSpan>
          </div>
          {/* Right Section */}
          <div className="right-section col-span-2">
            <AnimatedElement
              type="slideUp"
              duration={1}
              className="w-full h-full"
            >
              <h2 className="font-bold text-[50px] lg:text-[60px] xl:text-[70px] text-black leading-[1.1em] ">
                {t("an_exceptional_quality_that_cant_be_beaten")}
              </h2>
            </AnimatedElement>
          </div>
        </section>

        <section className="h-full md:h-[650px] w-full max-w-7xl mx-auto flex items-end justify-end">
          <AnimatedElement
            type="fadeIn"
            duration={1}
            className="w-full h-full"
          >
            <div className="bg-[url('/about-top-image.jpg')] bg-cover bg-center w-full h-full rounded-3xl p-3 flex items-end relative pt-60 md:pt-0 pb-10 md:pb-3">
              {/* shapes */}
              <div className="cover z-10 absolute top-0 left-0 w-full h-full">
                <div
                  className="absolute top-[60px] left-[-1px] bg-white w-[50px] h-[50px] rounded-br-xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,50 50,50 L 0 50 Z")',
                  }}
                ></div>
                <div className="absolute top-0 left-0 w-[150px] lg:w-[250px] h-[60px] bg-white rounded-br-3xl"></div>

                <div
                  className="absolute top-[0px] left-[149px] lg:left-[249px] bg-white w-[50px] h-[50px] rounded-br-xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,50 50,50 L 0 50 Z")',
                  }}
                ></div>
              </div>
              {/* end shapes */}
            </div>
          </AnimatedElement>
        </section>

        <section className="w-full max-w-7xl mx-auto pt-20 pb-30">
          {/* Tab Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-4 items-start justify-center">
            {OurValues().map(
              (value, index) => (
                <AnimatedElement
                  key={index}
                  type={value.animation as "slideUp" | "slideLeft" | "slideRight"}
                  duration={1}
                  delay={value.delay}
                  className="w-full h-full"
                >
                <button
                  className={`p-4 rounded-lg transition-all duration-300`}
                >
                  <div className="">
                    <div
                      className={`fill-[#DBA426] relative mb-3 border-b-2 border-gray-300 pb-8 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-[2px] after:bg-[#035B8D] after:transition-all after:duration-300`}
                    >
                      {value.icon}
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-2xl capitalize">
                        {value.title}
                      </h3>
                      <p className="text-lg mt-1 text-gray-500">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </button>
                </AnimatedElement>
              )
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default CoreValuesPage;
