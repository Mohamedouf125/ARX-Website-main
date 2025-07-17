"use client";

import React, { useState } from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import Image from "next/image";
import SmallHeadSpan from "../SharedComponent/SmallHeadSpan";
import { AnimatedElement } from "../animations/AnimationType";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const OurServices: NextPage = ({}) => {
  const t = useTranslations("our_features");
  const [activeTab, setActiveTab] = useState(0);

  const services = [
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
        >
          <path
            fill="#dba426"
            d="M4.265 7.999c0-2.057 1.674-3.734 3.734-3.734s3.734 1.674 3.734 3.734c0 2.057-1.674 3.734-3.734 3.734s-3.734-1.674-3.734-3.734zM0 7.999c0 4.418 3.581 7.999 7.999 7.999s7.999-3.581 7.999-7.999c0-4.418-3.581-7.999-7.999-7.999s-7.999 3.581-7.999 7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M0 24.001c0-4.418 3.581-7.999 7.999-7.999s7.999 3.581 7.999 7.999c0 4.418-3.581 7.999-7.999 7.999s-7.999-3.583-7.999-7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M15.999 7.999c0-4.418 3.583-7.999 8.002-7.999s7.999 3.581 7.999 7.999c0 4.418-3.581 7.999-7.999 7.999s-8.002-3.581-8.002-7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M20.266 24.001c0-2.057 1.674-3.734 3.734-3.734s3.734 1.674 3.734 3.734c0 2.060-1.674 3.734-3.734 3.734s-3.734-1.677-3.734-3.734zM15.999 24.001c0 4.418 3.581 7.999 7.999 7.999s7.999-3.581 7.999-7.999c0-4.418-3.581-7.999-7.999-7.999s-7.999 3.581-7.999 7.999z"
          ></path>
        </svg>
      ),
      title: t("Residential.title"),
      description: t("Residential.description"),
      image: "/h2_tab-icon1.jpg",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
        >
          <path
            fill="#dba426"
            d="M15.999 24.532c4.117 0 7.466 3.348 7.466 7.466h8.533c0-8.837-7.162-15.999-15.999-15.999s-15.999 7.165-15.999 16.001h8.533c0-4.117 3.348-7.468 7.466-7.468z"
          ></path>
          <path
            fill="#dba426"
            d="M15.999 7.466c-4.117 0-7.466-3.348-7.466-7.466h-8.533c0 8.837 7.162 15.999 15.999 15.999s16.001-7.162 16.001-15.999h-8.533c0 4.117-3.351 7.466-7.468 7.466z"
          ></path>
        </svg>
      ),
      title: t("Medical.title"),
      description: t("Medical.description"),
      image: "/h2_tab-icon2.jpg",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
        >
          <path
            fill="#dba426"
            d="M24.001 5.333c-1.471 0-2.666 1.195-2.666 2.666s1.195 2.667 2.666 2.667 2.666-1.195 2.666-2.667h5.333c0 4.418-3.581 7.999-7.999 7.999s-7.999-3.581-7.999-7.999c-0.002-4.418 3.581-7.999 7.999-7.999v5.333z"
          ></path>
          <path
            fill="#dba426"
            d="M5.333 7.999c0 1.471 1.195 2.667 2.666 2.667s2.667-1.195 2.667-2.667c0-1.471-1.195-2.666-2.667-2.666v-5.333c4.418 0 7.999 3.581 7.999 7.999s-3.581 7.999-7.999 7.999c-4.418 0-7.999-3.581-7.999-7.999h5.333z"
          ></path>
          <path
            fill="#dba426"
            d="M26.667 24.001c0-1.471-1.195-2.667-2.666-2.667s-2.667 1.195-2.667 2.667c0 1.471 1.195 2.666 2.667 2.666v5.333c-4.418 0-7.999-3.581-7.999-7.999s3.581-7.999 7.999-7.999c4.418 0 7.999 3.581 7.999 7.999h-5.333z"
          ></path>
          <path
            fill="#dba426"
            d="M7.999 26.667c1.471 0 2.667-1.195 2.667-2.666s-1.195-2.667-2.667-2.667c-1.471 0-2.666 1.195-2.666 2.667h-5.333c0-4.418 3.581-7.999 7.999-7.999s7.999 3.581 7.999 7.999c0 4.418-3.581 7.999-7.999 7.999v-5.333z"
          ></path>
        </svg>
      ),
      title: t("Commercial.title"),
      description: t("Commercial.description"),
      image: "/h2_tab-icon3.jpg",
    },
    {
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          viewBox="0 0 32 32"
        >
          <path
            fill="#dba426"
            d="M24 0c4.418 0 7.999 3.581 7.999 7.999h-16.001c0-4.418 3.583-7.999 8.002-7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M24 7.999c4.418 0 7.999 3.581 7.999 7.999h-16.001c0-4.418 3.583-7.999 8.002-7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M7.999 32c-4.418 0-7.999-3.583-7.999-7.999h15.999c0 4.416-3.581 7.999-7.999 7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M7.999 24.001c-4.418 0-7.999-3.583-7.999-8.002h15.999c0 4.418-3.581 8.002-7.999 8.002z"
          ></path>
          <path
            fill="#dba426"
            d="M32 24.001c0 4.418-3.581 7.999-7.999 7.999v-16.001c4.416 0 7.999 3.583 7.999 8.002z"
          ></path>
          <path
            fill="#dba426"
            d="M24.001 24.001c0 4.418-3.581 7.999-7.999 7.999v-16.001c4.416 0 7.999 3.583 7.999 8.002z"
          ></path>
          <path
            fill="#dba426"
            d="M0 7.999c0-4.418 3.581-7.999 7.999-7.999v15.999c-4.418 0-7.999-3.581-7.999-7.999z"
          ></path>
          <path
            fill="#dba426"
            d="M7.999 7.999c0-4.418 3.581-7.999 7.999-7.999v15.999c-4.418 0-7.999-3.581-7.999-7.999z"
          ></path>
        </svg>
      ),
      title: t("Administrative.title"),
      description: t("Administrative.description"),
      image: "/h2_tab-icon4.jpg",
    },
  ];

  const ServiceCard = ({ service, index, isActive, onClick }: any) => (
    <button
      onClick={onClick}
      className={`p-4 rounded-lg transition-all duration-300 w-full ${
        isActive ? "opacity-100" : "opacity-30"
      }`}
    >
      <div className="">
        <div
          className={`text-[#DBA426] relative mb-3 border-b-2 border-gray-300 pb-8 after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-[2px] after:bg-[#DBA426] after:transition-all after:duration-300 ${
            isActive ? "fill-[#DBA426] after:w-full" : "fill-black"
          }`}
        >
          {service.icon}
        </div>
        <div className="text-left">
          <h3 className="font-bold text-2xl capitalize">{service.title}</h3>
          <p className="text-md mt-1 text-gray-500">{service.description}</p>
        </div>
      </div>
    </button>
  );

  return (
    <div className="w-full py-20 pt-40 mx-auto bg-white font-['lato'] mt-[-100px] rounded-t-3xl overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 mb-10 items-center justify-between px-4">
          {/* Left Column - Tabs and Content */}
          <div className="space-y-8 w-full">
            {/* Tab Content */}
            <SmallHeadSpan>{t("span")}</SmallHeadSpan>
            {/* Section Title */}
            <AnimatedElement
              type="slideLeft"
              duration={1}
              className="w-full h-full"
            >
              <div className="relative mb-12">
                <h2 className="text-[40px] lg:text-[60px] font-[700] leading-[0.9em] font-bold mt-2 font-['Helvetica']">
                  {t("title")}
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
                  style={{
                    clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
                  }}
                ></div>
                <div className="absolute top-0 left-0 bg-white w-[240px] h-[60px] rounded-br-3xl"></div>
                <div
                  className="absolute top-[-3px] left-[240px] bg-white w-[30px] h-[30px] rounded-tl-4xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
                  }}
                ></div>
              </div>
              {/* end shapes */}
              <AnimatedElement
                type="slideUp"
                duration={1}
                className="w-full h-full"
              >
                <Image
                  src={services[activeTab].image}
                  alt={services[activeTab].title}
                  width={500}
                  height={500}
                  className="object-cover rounded-3xl w-full h-full shadow-none"
                />
              </AnimatedElement>
            </div>
          </div>
        </div>

        {/* Tab Buttons - Grid for desktop, Swiper for mobile */}
        <AnimatedElement type="slideUp" duration={1} className="w-full h-full">
          {/* Desktop Grid - Hidden on mobile */}
          <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-start justify-center">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                index={index}
                isActive={activeTab === index}
                onClick={() => setActiveTab(index)}
              />
            ))}
          </div>

          {/* Mobile Swiper - Visible only on mobile */}
          <div className="block sm:hidden">
            <Swiper
              modules={[Pagination]}
              spaceBetween={16}
              slidesPerView={1.2}
              centeredSlides={false}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              autoplay={{
                delay: 3500,
                disableOnInteraction: false,
              }}
              loop
              onSlideChange={(swiper) => setActiveTab(swiper.activeIndex)}
              initialSlide={activeTab}
              className="services-swiper"
            >
              {services.map((service, index) => (
                <SwiperSlide key={index}>
                  <ServiceCard
                    service={service}
                    index={index}
                    isActive={true}
                    onClick={() => setActiveTab(index)}
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

export default OurServices;
