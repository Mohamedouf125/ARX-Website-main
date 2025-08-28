"use client";
import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import { useLocale, useTranslations } from "next-intl";
import PageHero from "@/components/PageHero";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import { AnimatedElement } from "@/components/animations/AnimationType";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
// import LeasingApplicationForm from "./components/LeasingApplicationForm";
import ServiceCard from "./components/projects";
import PropertySwiper from "./components/ImageSwiper";
import "swiper/css";
import HomeContact from "@/components/home/HomeContact";

// Define the correct type for aboutBanner
interface AboutBannerType {
  data: {
    bannerHeader?: {
      image: string;
    };
    bannerInside?: {
      image: string;
    };
    bannerOurImPact?: {
      image: string;
    };
    bannerCoreValue?: {
      image: string;
    };
  };
}

// Service data interface
interface ServiceItem {
  id: number;
  image: string;
  title: string;
  description: string;
}

interface TimelineItem {
  year: string;
  title: string;
  image: string;
}

const AboutPage = () => {
  const t = useTranslations("about");
  const locale = useLocale();

  // Swiper refs and states
  const swiperRef = useRef<SwiperType | null>(null);
  const centerSectionRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Updated state type to match API response
  const [aboutBanner, setAboutBanner] = useState<AboutBannerType>({
    data: {
      bannerHeader: { image: "" },
      bannerInside: { image: "" },
      bannerOurImPact: { image: "" },
      bannerCoreValue: { image: "" },
    },
  });

  // Timeline data for the scroll-controlled swiper
  const timelineData: TimelineItem[] = [
    {
      year: "1983",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "/pngimg.png",
    },
    {
      year: "1996",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "/pngimg.png",
    },
    {
      year: "2005",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "/pngimg.png",
    },
    {
      year: "2010",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "/pngimg.png",
    },
    {
      year: "2014",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "/pngimg.png",
    },
    {
      year: "2018",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "/pngimg.png",
    },
  ];

  // Dummy services data
  const servicesData: ServiceItem[] = [
    {
      id: 1,
      image: "/images/home/VALUES.png",
      title: "Real Estate Development",
      description:
        "We engage as early as possible, typically during the conceptual or schematic stage.",
    },
    {
      id: 2,
      image: "/images/home/VALUES.png",
      title: "Property Management",
      description:
        "Comprehensive property management services to maximize your investment returns and tenant satisfaction.",
    },
    {
      id: 3,
      image: "/images/home/VALUES.png",
      title: "Construction Services",
      description:
        "From planning to execution, we deliver high-quality construction projects on time and within budget.",
    },
    {
      id: 4,
      image: "/images/home/VALUES.png",
      title: "Investment Advisory",
      description:
        "Expert guidance on real estate investments to help you make informed decisions in today's market.",
    },
    {
      id: 5,
      image: "/images/home/VALUES.png",
      title: "Commercial Leasing",
      description:
        "Strategic commercial leasing solutions tailored to meet your business needs and growth objectives.",
    },
    {
      id: 6,
      image: "/images/home/VALUES.png",
      title: "Residential Sales",
      description:
        "Premium residential properties with modern amenities in prime locations across the city.",
    },
  ];

  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    if (!mounted || !centerSectionRef.current || !swiperRef.current) return;

    const handleScroll = () => {
      const centerSection = centerSectionRef.current;
      const swiper = swiperRef.current;

      if (!centerSection || !swiper) return;

      const rect = centerSection.getBoundingClientRect();
      const sectionHeight = centerSection.offsetHeight;
      const windowHeight = window.innerHeight;

      // Calculate scroll progress through the center section
      const scrollProgress = Math.max(
        0,
        Math.min(
          1,
          (windowHeight - rect.top) / (windowHeight + sectionHeight * 1.2)
        )
      );

      // Total slides: 1 start space + timeline items + 1 quote card + 1 end space
      const totalSlides = 1 + timelineData.length + 1 + 1; // start + timeline + quote + end

      // Calculate target slide based on scroll progress
      // We want to show the full range including spacing
      const targetSlide = Math.floor(scrollProgress * (totalSlides - 1));

      // Clamp the target slide to valid range
      const clampedTargetSlide = Math.max(
        0,
        Math.min(totalSlides - 1, targetSlide)
      );

      if (swiper.activeIndex !== clampedTargetSlide) {
        swiper.slideTo(clampedTargetSlide, 200);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted, timelineData.length]);

  useEffect(() => {
    const fetchAboutBanner = async () => {
      try {
        const data = await getData(
          "about-us-banners",
          {},
          new AxiosHeaders({ lang: locale })
        );
        setAboutBanner(data);
      } catch (err) {
        console.error("Failed to fetch about banner:", err);
      }
    };

    fetchAboutBanner();
  }, [locale]);

  const handleServiceClick = (service: ServiceItem) => {
    console.log("Service clicked:", service);
    // Handle service card click - navigate to service page, open modal, etc.
  };

  if (!mounted) {
    return <div className="min-h-screen bg-gray-100" />;
  }

  return (
    <div className="text-gray-800 mx-auto">
      {/* Hero Section */}
      <PageHero
        title={t("title")}
        hideDescription={true}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title") },
        ]}
        backgroundImage={aboutBanner?.data?.bannerHeader?.image}
        height="medium"
      />

      <div className="rounded-t-3xl bg-white flex flex-col items-center px-6 mx-auto relative z-10 overflow-hidden">
        {/* VISION / MISSION / VALUES */}
        <section className="grid grid-cols-1 md:grid-cols-2 items-center pt-14 pb-20 gap-10 lg:gap-20 xl:gap-30 font-[sans-serif] max-w-7xl">
          {/* Left Section */}
          <div className="left-section px-4 sm:px-6 lg:px-8">
            <SmallHeadSpan>{t("vision_title")}</SmallHeadSpan>
            <AnimatedElement
              type="slideUp"
              duration={1}
              className="w-full h-full"
            >
              <h2 className="font-bold text-[28px] xs:text-[32px] sm:text-[38px] md:text-[45px] lg:text-[60px] xl:text-[50px] text-black leading-tight sm:leading-normal break-words hyphens-auto">
                {t("description")}
              </h2>
            </AnimatedElement>
          </div>
          {/* Right Section */}
          <div className="right-section">
            <h4 className="font-[600] text-[18px] md:text-[22px] leading-[1.5em] mb-5">
              {t("vision_description_part_one")}
            </h4>
            <p className="font-[500] text-[16px] md:text-[18px] opacity-60">
              {t("vision_description_part_two")}
            </p>
          </div>
        </section>

        <section className="h-full md:h-[650px] w-full max-w-7xl mx-auto flex items-end justify-end mb-10">
          <div
            style={{
              backgroundImage: `url(${aboutBanner?.data?.bannerInside?.image})`,
            }}
            className=" bg-cover bg-center w-full h-full rounded-3xl p-3 flex items-end relative pt-60 md:pt-0 pb-10 md:pb-3"
          >
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
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="w-full bg-gray-50 pb-20 pt-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="pb-5 lg:gap-64 gap-0 lg:flex block">
            <SmallHeadSpan>{t("Our Services")}</SmallHeadSpan>
            <h2
              className={`font-bold ${
                locale === "en"
                  ? "text-left lg:text-left"
                  : "text-right lg:text-right"
              }
    max-w-[95vw] sm:max-w-[85vw] md:max-w-[70vw] lg:max-w-[38vw]
    mx-auto lg:mx-0
    text-[clamp(2rem,6vw,4.5rem)] sm:text-[clamp(2.5rem,7vw,4.5rem)] lg:text-[clamp(3rem,8vw,4.5rem)]
    text-black
    mt-3 sm:mt-4
    mb-4 sm:mb-5 lg:mb-6
    px-4 sm:px-6 lg:px-0
    leading-none`}
            >
              {t("Take a brief look at some of the services we offer")}
            </h2>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                image={service.image}
                title={service.title}
                description={service.description}
                onClick={() => handleServiceClick(service)}
                className="hover:transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Center Section with Sticky Swiper */}
      <section
        ref={centerSectionRef}
        className="h-[300vh] max-w-[1920px] mx-auto relative "
      >
        <div className="sticky  top-20 h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white z-20">
          {/* Header */}
          <div
            className={`${
              locale === "ar" ? "text-right" : "text-left"
            } pb-26 w-full  max-w-7xl mx-auto`}
          >
            <SmallHeadSpan>{t("OUR_STORY")}</SmallHeadSpan>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-black ">
              {t("40+")}<br />
              <span className="text-gray-900">{t("remarkable journey")}</span>
            </h1>
          </div>

          {/* Swiper Container */}
          <div className="w-full relative">
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              slidesPerView={4}
              spaceBetween={60}
              allowTouchMove={false}
              centeredSlides={false}
              breakpoints={{
                320: {
                  slidesPerView: 1,
                  spaceBetween: 16,
                },
                640: {
                  slidesPerView: 1.5,
                  spaceBetween: 24,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
                1280: {
                  slidesPerView: 4,
                  spaceBetween: 60,
                },
              }}
              className="w-full relative z-10"
            >
              {/* Empty slide at the beginning for spacing */}
              <SwiperSlide key="start-space">
                <div className="w-full h-full flex items-center justify-center px-2">
                  {/* Empty space slide */}
                  <div className="flex flex-col items-center max-w-xs mx-auto opacity-0">
                    <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent -ml-4 sm:-ml-8 -mb-8 sm:-mb-12">
                      &nbsp;
                    </div>
                    <div className="relative mb-16 sm:mb-20">
                      <div className="w-full h-32 sm:h-40 lg:h-48 flex items-center rounded-md justify-center">
                        {/* Empty space */}
                      </div>
                    </div>
                    <div className="relative z-20 flex items-center justify-center">
                      <div className="w-7 sm:w-9 h-7 sm:h-9 bg-transparent rounded-full relative z-10"></div>
                    </div>
                    <div className="mb-3 sm:mb-4"></div>
                  </div>
                </div>
              </SwiperSlide>

              {timelineData.map((item, index) => (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center px-2">
                    {/* Timeline Item */}
                    <div className="flex flex-col items-center max-w-xs mx-auto">
                      {/* Year */}
                      <div className="text-6xl sm:text-5xl lg:text-7xl font-bold text-[#e4ed64] -ml-4 sm:-ml-8 -mb-8 sm:-mb-12">
                        {item.year}
                      </div>

                      {/* Building/House Image */}
                      <div className="relative mb-16 sm:mb-20">
                        <div className="w-full h-32 sm:h-40 lg:h-38 flex items-center rounded-md justify-center">
                          <img
                            src={item.image}
                            alt={`Building ${item.year}`}
                            className="max-w-full min-w-[100px] sm:min-w-[140px] lg:min-w-[180px] max-h-full object-contain filter drop-shadow-2xl"
                          />
                        </div>
                      </div>

                      {/* Indicator Dot with connecting line */}
                      <div className="relative z-20  flex items-center justify-center">
                        {/* Left line segment */}
                        {index > 0 && (
                          <div
                            className="absolute right-1/2 w-full h-1 bg-gradient-to-r from-[#e4ed64] to-[#e4ed64] hidden sm:block"
                            style={{ width: "calc(25vw - 50px)" }}
                          ></div>
                        )}

                        {/* Right line segment */}
                        {index < timelineData.length && (
                          <div
                            className="absolute  left-1/2 w-full h-1 bg-gradient-to-r from-[#e4ed64] to-[#e4ed64] hidden sm:block"
                            style={{ width: "calc(30vw - 50px)" }}
                          ></div>
                        )}

                        {/* The dot */}
                        <div className="w-7 sm:w-9 h-7 sm:h-9 bg-[#e4ed64] rounded-full shadow-lg border-2 sm:border-4 border-white relative z-10"></div>
                      </div>
                      <div className="mb-3 sm:mb-4"></div>

                      {/* Description */}
                      <div className="text-center max-w-xs px-2">
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}

              {/* Quote Card */}
              <SwiperSlide key="quote-card">
                <div className="w-full h-full flex items-center justify-center px-2">
                  {/* Quote Card */}
                  <div className="flex flex-col items-center max-w-xs mx-auto">
                    {/* Empty space where year would be */}
                    <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent -ml-4 sm:-ml-8 -mb-8 sm:-mb-12">
                      &nbsp;
                    </div>

                    {/* Empty space where building image would be */}
                    <div className="relative mb-16 sm:mb-20">
                      <div className="w-full h-32 sm:h-40 lg:h-48 flex items-center rounded-md justify-center">
                        {/* Empty space */}
                      </div>
                    </div>

                    {/* Bigger Indicator Dot */}
                    <div className="relative z-20 flex items-center justify-center">
                      {/* The bigger dot */}
                      <div className="w-30 sm:w-34 h-30 sm:h-34 -top-[6vw] bg-[#e4ed64] rounded-full  relative z-10 flex items-center justify-center">
                        <span className="text-black font-bold text-sm sm:text-base text-center leading-tight px-2">
                          Get your
                          <br />
                          free quote
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>

              {/* Empty slide at the end for spacing */}
              <SwiperSlide key="end-space">
                <div className="w-full h-full flex items-center justify-center px-2">
                  {/* Empty space slide */}
                  <div className="flex flex-col items-center max-w-xs mx-auto opacity-0">
                    <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent -ml-4 sm:-ml-8 -mb-8 sm:-mb-12">
                      &nbsp;
                    </div>
                    <div className="relative mb-16 sm:mb-20">
                      <div className="w-full h-32 sm:h-40 lg:h-48 flex items-center rounded-md justify-center">
                        {/* Empty space */}
                      </div>
                    </div>
                    <div className="relative z-20 flex items-center justify-center">
                      <div className="w-7 sm:w-9 h-7 sm:h-9 bg-transparent rounded-full relative z-10"></div>
                    </div>
                    <div className="mb-3 sm:mb-4"></div>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* swiper hear  */}
      <PropertySwiper />
      <section className="w-full h-full py-[10vw] ">
          <HomeContact contact="/about.jpg" />

      </section>
    </div>
  );
};

export default AboutPage;
