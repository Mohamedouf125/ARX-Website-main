"use client";

import React, { useState } from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SmallHeadSpan from "../SharedComponent/SmallHeadSpan";
import { AnimatedElement } from "../animations/AnimationType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useLocale } from "next-intl";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

interface Service {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface OurServicesProps {
  services?: Service[];
}

// ✅ بديل آمن يعمل على السيرفر والعميل
const stripHtmlTags = (html?: string) => {
  if (!html) return "";
  return html.replace(/<[^>]*>?/gm, "").trim();
};

const OurServices: NextPage<OurServicesProps> = ({ services = [] }) => {
  const t = useTranslations("our_features");
  const [activeTab, setActiveTab] = useState(0);
  const locale = useLocale();

  // ✅ نتعامل مع أي نقص في الداتا بدون كسر الريندر
  const servicess = services.map((service, index) => ({
    icon: (
      <Image
        src={service?.image || "/placeholder-40x40.png"}
        alt={service?.title || "Service"}
        width={40}
        height={40}
        className="rounded-lg object-cover"
      />
    ),
    title: service?.title || "",
    description: stripHtmlTags(service?.description),
    image: `/h2_tab-icon${index + 1}.jpg`, // صور ثابتة للعرض الرئيسي
  }));

  if (!services || services.length === 0) {
    return (
      <div className="px-4 py-12 text-center text-gray-500">
        No services available
      </div>
    );
  }

  return (
    <div className="w-full py-20 pt-40 mx-auto bg-white font-['lato'] mt-[-100px] rounded-t-3xl overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10 items-center justify-between px-4">
          {/* Left Column - Tabs and Content */}
          <div className="space-y-8 w-full">
            <SmallHeadSpan>{t("span")}</SmallHeadSpan>
            <AnimatedElement
              type="slideLeft"
              duration={1}
              className="w-full h-full"
            >
              <div className="relative mb-12 px-4 py-6">
                <h2 className="text-[40px] lg:text-[50px] font-[700] leading-[1.2em] mt-2 font-['Helvetica']">
                  <span className="block mb-2">{t("title.line1")}</span>
                  <span className="block mb-2 lg:inline">
                    {t("title.line2")}
                  </span>
                  <span className="block">{t("title.line3")}</span>
                </h2>
              </div>
            </AnimatedElement>
          </div>

          {/* Right Column - Image */}
          <div className="cover w-full">
            <div className="relative rounded-3xl">
              {/* shapes */}
              <div className="cover z-10 absolute top-0 left-0 w-full h-full">
                <div
                  className="absolute top-[59px] left-[-1px] bg-white w-[30px] h-[30px] rounded-br-2xl rotate-[90deg]"
                  style={{ clipPath: 'path("M0 0 Q0,30 30,30 L 0 30 Z")' }}
                />
                <div className="absolute top-0 left-0 bg-white w-[240px] h-[60px] rounded-br-3xl" />
                <div
                  className="absolute top-[-3px] left-[240px] bg-white w-[30px] h-[30px] rounded-tl-4xl rotate-[90deg]"
                  style={{ clipPath: 'path("M0 0 Q0,30 30,30 L 0 30 Z")' }}
                />
              </div>
              {/* end shapes */}
              <AnimatedElement
                type="slideUp"
                duration={1}
                className="w-full h-full"
              >
                <Image
                  src={servicess[activeTab]?.image || "/h2_tab-icon1.jpg"}
                  alt={servicess[activeTab]?.title || "Service"}
                  width={500}
                  height={500}
                  className="object-cover rounded-3xl w-full h-full shadow-none"
                />
              </AnimatedElement>
            </div>
          </div>
        </div>

        {/* Tab Buttons */}
        <AnimatedElement type="slideUp" duration={1} className="w-full h-full">
          {/* Desktop Grid */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start justify-center">
            {servicess.map((service, index) => (
              <ServiceCard
                key={services[index]?.id ?? index}
                service={service}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
                locale={locale}
              />
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="block sm:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={false}
              pagination={{ clickable: true, dynamicBullets: true }}
              // ملاحظة: لو عايز Autoplay لازم تضيف Module الخاص به
              loop
              onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
              initialSlide={activeTab}
              className="services-swiper"
            >
              {servicess.map((service, index) => (
                <SwiperSlide key={services[index]?.id ?? index}>
                  <ServiceCard
                    service={service}
                    isActive={true}
                    onClick={() => setActiveTab(index)}
                    locale={locale}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </AnimatedElement>
      </div>

      {/* Custom styles for Swiper pagination */}
      <style jsx global>{`
        .services-swiper .swiper-pagination {
          position: relative;
          margin-top: 20px;
        }
        .services-swiper .swiper-pagination-bullet {
          background-color: #e5e7eb;
          opacity: 1;
        }
        .services-swiper .swiper-pagination-bullet-active {
          background-color: #dba426;
        }
      `}</style>
    </div>
  );
};

function ServiceCard({
  service,
  isActive,
  onClick,
  locale,
}: {
  service: {
    icon: React.ReactNode;
    title: string;
    description: string;
    image: string;
  };
  isActive: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  locale: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg transition-all duration-300 w-full ${
        isActive ? "opacity-100" : "opacity-30"
      }`}
      aria-pressed={isActive}
      type="button"
    >
      <div>
        <div
          className={`text-[#DBA426] relative mb-3 border-b-2 border-gray-300 pb-8 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-[2px] after:bg-[#DBA426] after:transition-all after:duration-300 ${
            isActive ? "fill-[#DBA426] after:w-full" : "fill-black"
          }`}
        >
          {service.icon}
        </div>
        <div className={locale === "ar" ? "text-right" : "text-left"}>
          <h3 className="font-bold text-2xl capitalize">{service.title}</h3>
          <p className="text-md mt-1 text-gray-500">{service.description}</p>
        </div>
      </div>
    </button>
  );
}

export default OurServices;
