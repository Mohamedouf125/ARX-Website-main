"use client";
import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import PageHero from "@/components/PageHero";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import { AnimatedElement } from "@/components/animations/AnimationType";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import ServiceCard from "./components/projects";
// import PropertySwiper from "./components/ImageSwiper";
import HomeContact from "@/components/home/HomeContact";
import TimelineSwiper from "./components/TimelineSwiper"; // Import the new component
import { OurProjects } from "@/components/home/OurProjects";

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

const AboutPage = () => {
  const t = useTranslations("about");
  const locale = useLocale();
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const response = await getData(
        "properties",
        {},
        new AxiosHeaders({ lang: locale })
      );
      setProjects(response.data.properties);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  };

  useEffect(() => {
    getProjects();
  }, []);

  // Updated state type to match API response
  const [aboutBanner, setAboutBanner] = useState<AboutBannerType>({
    data: {
      bannerHeader: { image: "" },
      bannerInside: { image: "" },
      bannerOurImPact: { image: "" },
      bannerCoreValue: { image: "" },
    },
  });

  // Services data (titles as-is), descriptions from i18n keys
  const servicesData: ServiceItem[] = [
    {
      id: 1,
      image: "/aboutServices/prime.png",
      title: t("services_title.s1"),
      description: t("services_descriptions.s1"),
    },
    {
      id: 2,
      image: "/aboutServices/modern.webp",
      title: t("services_title.s2"),
      description: t("services_descriptions.s2"),
    },
    {
      id: 3,
      image: "/aboutServices/professional.png",
      title: t("services_title.s3"),
      description: t("services_descriptions.s3"),
    },
    {
      id: 4,
      image: "/aboutServices/marketing.png",
      title: t("services_title.s4"),
      description: t("services_descriptions.s4"),
    },
    {
      id: 5,
      image: "/aboutServices/comperhensive.png",
      title: t("services_title.s5"),
      description: t("services_descriptions.s5"),
    },
    {
      id: 6,
      image: "/aboutServices/secure.png",
      title: t("services_title.s6"),
      description: t("services_descriptions.s6"),
    },
  ];

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

  return (
    <div className="text-gray-800 mx-auto">
      {/* Hero Section */}
      <PageHero
        title={t("leasingTitle")}
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
                {t("leasingDescription")}
              </h2>
            </AnimatedElement>
          </div>
          {/* Right Section */}
          <div className="right-section">
            <h4 className="font-[600] text-[18px] md:text-[22px] leading-[1.5em] mb-5">
              {t("leasing_vision_description_part_one")}
            </h4>
            <p className="font-[500] text-[16px] md:text-[18px] opacity-60">
              {t("leasing_vision_description_part_two")}
            </p>
          </div>
        </section>

        <section className="h-full md:h-[650px] w-full max-w-7xl mx-auto flex items-end justify-end mb-10">
          <div
            style={{
              backgroundImage: `url(/aboutServices/whoARX.webp)`,
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
                // description={service.description}
                onClick={() => handleServiceClick(service)}
                className="hover:transform hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Swiper Component */}
      <TimelineSwiper />

      {/* swiper hear  */}
      {/* <PropertySwiper /> */}
      <OurProjects projects={projects} />
      <section className="w-full h-full pb-[170px] ">
        <HomeContact contact="/about.jpg" />
      </section>
    </div>
  );
};

export default AboutPage;
