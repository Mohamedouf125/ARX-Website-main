"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { ProjectType } from "@/libs/types/types";
import PhotosSwiper from "./components/PhotosSwiper";
import PageHero from "@/components/PageHero";
import Script from "next/script";
import {
  Building,
  CalendarCog,
  CircleDollarSignIcon,
  Layers,
  ShieldCheck,
  Wifi,
  Users,
  Star,
  Heart,
  Zap,
  Camera,
  Phone,
  Mail,
  Globe,
  Settings,
  View,
  LucideWorkflow,
  MonitorCog,
  SmartphoneCharging,
  EarthLock,
  LayoutPanelLeft,
  TruckElectric,
  Images,
  Video,
  Route,
  BookImage,
} from "lucide-react";
import PlansSwiper from "./components/PlansSwiper";
import SectionButton from "@/components/SharedComponent/SectionButton";

interface TabContent {
  id: string;
  name: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const ProjectPage: React.FC = () => {
  const locale = useLocale();
  const { id } = useParams();
  const [projectData, setProjectData] = useState<ProjectType | null>(null);

  // State for video swiper
  const [currentVideoSlide, setCurrentVideoSlide] = useState(0);
  // Changed default from "all" to "amenity"
  const [amenityFilter, setAmenityFilter] = useState("amenity");
  const filteredAmenities =
    projectData?.amenities?.filter((item) => {
      if (amenityFilter === "amenity") return item.type === "amenity";
      if (amenityFilter === "outdoor") return item.type === "out_door_feature";
      return true;
    }) || [];
  // State for tabs
  const [activeTab, setActiveTab] = useState("photos");

  const t = useTranslations("projects");

  // Icon mapping for features
  const featureIcons = [
    LucideWorkflow, // Default icon
    MonitorCog,
    SmartphoneCharging,
    EarthLock,
    View,
    LayoutPanelLeft,
    TruckElectric,
    Wifi,
    Users,
    Star,
    Heart,
    Zap,
    Camera,
    Phone,
    Mail,
    Globe,
    Settings,
  ];

  // Add JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: projectData?.title || "",
    description: projectData?.description || "",
    image: projectData?.image ? [projectData.image] : [],
    brand: {
      "@type": "Organization",
      name: "ARX Real Estate Development",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "EGP",
      price: projectData?.start_price || "",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
      url: typeof window !== "undefined" ? window.location.href : "",
    },
  };

  // featch project data
  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await getData(
          `property/${id}`,
          {},
          new AxiosHeaders({
            lang: locale,
          })
        );
        setProjectData(response.data);
      } catch (error) {
        throw error;
      }
    };

    feachData();
  }, [id, locale]);
  const tabs: TabContent[] = [
    {
      id: "photos",
      name: "photos",
      icon: <Images />,
      content: <PhotosSwiper projectData={projectData} />,
    },
    {
      id: "videos",
      name: "videos",
      icon: <Video />,
      content: (
        <div className="relative overflow-hidden space-y-3 py-3">
          {/* Main Video Swiper */}
          <div className="relative">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentVideoSlide * 100}%)` }}
            >
              {projectData?.property_listing_videos?.map((video) => (
                <div
                  key={video.id}
                  className="w-full h-[300px] sm:h-[400px] lg:h-[600px] xl:h-[700px] flex-shrink-0"
                >
                  <div className="aspect-video h-full w-full bg-gray-800 overflow-hidden relative rounded-3xl">
                    {video.type === "youtube" ? (
                      <iframe
                        src={video.video}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <video
                        src={video.video}
                        className="w-full h-full rounded-3xl"
                        controls
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Arrow navigation */}
            <button
              onClick={() =>
                setCurrentVideoSlide((prev) =>
                  prev === 0
                    ? (projectData?.property_listing_videos?.length || 1) - 1
                    : prev - 1
                )
              }
              className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white z-10 hover:bg-black/70"
              aria-label="Previous video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() =>
                setCurrentVideoSlide((prev) =>
                  prev ===
                  (projectData?.property_listing_videos?.length || 1) - 1
                    ? 0
                    : prev + 1
                )
              }
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white z-10 hover:bg-black/70"
              aria-label="Next video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      ),
    },
    {
      id: "plan",
      name: "plan",
      icon: <Route />,
      content: <PlansSwiper projectData={projectData} />,
    },
    {
      id: "brochure",
      name: "Brochure",
      icon: <BookImage />,
      content: (
        <div className="flex lg:flex-row items-center justify-between w-full lg:gap-6 gap-0  flex-col  sm:gap-10">
          <div className="w-full">
            {projectData?.brochure ? (
              <div className="bg-white rounded-3xl">
                <div className="w-full h-[300px] sm:h-[400px] lg:h-[600px] border border-gray-200 rounded-lg overflow-hidden">
                  <iframe
                    src={`${projectData.brochure}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="w-full h-full"
                    title="Project Brochure"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-3xl">
                <BookImage className="w-16 h-16 text-gray-400 mb-4" />
                <h3 className="text-xl font-[600] text-gray-600 mb-2">
                  {t("no_brochure_available")}
                </h3>
                <p className="text-gray-500 text-center max-w-md">
                  {t("brochure_not_available_message")}
                </p>
              </div>
            )}
          </div>
        </div>
      ),
    },
  ];

  if (!projectData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overflow-hidden">
      <Script
        id="project-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        title={projectData?.title || "Axiom Tower"}
        backgroundImage={projectData?.icon || ""}
        height="small"
        hideDescription={true}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("name"), href: "/projects" },
          { label: projectData?.title || "Axiom Tower" },
        ]}
      />

      <div className="relative w-full bg-white pb-30 pt-20 rounded-3xl z-10">
        {/* Project Information Section */}
        <div className="max-w-[1350px] mx-auto px-6 mb-10">
          <div className="">
            <div className="mb-16">
              <div className="flex items-center gap-2 mb-4 md:mb-0">
                <svg
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99935 7.99967C7.26602 7.99967 6.66602 7.39967 6.66602 6.66634C6.66602 5.93301 7.26602 5.33301 7.99935 5.33301C8.73268 5.33301 9.33268 5.93301 9.33268 6.66634C9.33268 7.39967 8.73268 7.99967 7.99935 7.99967ZM11.9993 6.79967C11.9993 4.37967 10.2327 2.66634 7.99935 2.66634C5.76602 2.66634 3.99935 4.37967 3.99935 6.79967C3.99935 8.35967 5.29935 10.4263 7.99935 12.893C10.6993 10.4263 11.9993 8.35967 11.9993 6.79967ZM7.99935 1.33301C10.7993 1.33301 13.3327 3.47967 13.3327 6.79967C13.3327 9.01301 11.5527 11.633 7.99935 14.6663C4.44602 11.633 2.66602 9.01301 2.66602 6.79967C2.66602 3.47967 5.19935 1.33301 7.99935 1.33301Z"
                    fill="#dba426"
                  />
                </svg>
                <div className="text-[16px] font-[600] capitalize">
                  {projectData?.location}
                </div>
              </div>

              <div className="flex border-b border-gray-300 pb-5">
                <h1 className="text-[40px] md:text-[55px] lg:text-[65px] font-[700] capitalize">
                  {projectData?.title}
                </h1>
              </div>
            </div>

            <div className="list">
              <ul className="grid grid-cols-2 md:flex flex-wrap md:gap-18 gap-10">
                {[
                  {
                    id: 1,
                    icon: <Layers className="w-6 h-6 text-black" />,
                    title: t("status"),
                    description: projectData.project_status,
                  },
                  {
                    id: 2,
                    icon: <Building className="w-6 h-6 text-black" />,
                    title: t("type"),
                    description: projectData.project_type,
                  },
                  {
                    id: 3,
                    icon: <Globe className="w-6 h-6 text-black" />,
                    title: t("project_area"),
                    description: projectData?.location,
                  },
                  {
                    id: 4,
                    icon: <CalendarCog className="w-6 h-6 text-black" />,
                    title: t("commencement_date"),
                    description: projectData?.year_built,
                  },
                  {
                    id: 5,
                    icon: (
                      <CircleDollarSignIcon className="w-6 h-6 text-black" />
                    ),
                    title: t("price_range"),
                    description:
                      projectData?.start_price + " - " + projectData?.end_price,
                  },
                ].map((item) => (
                  <li
                    className={`flex items-center text-center ${
                      locale === "en" ? "md:text-left" : "md:text-right"
                    } flex-col md:flex-row gap-2`}
                    key={item.id}
                  >
                    <div className="icon flex items-center justify-center p-4 rounded-full border border-gray-200">
                      {item.icon}
                    </div>
                    <div className="content">
                      <span className="text-[14px] md:text-[15px] font-[600] opacity-50">
                        {item.title}
                      </span>
                      <h3 className="text-[14px] md:text-[15px] font-[600]">
                        {item.description}
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="image mt-10 md:mt-16">
              <Image
                src={projectData?.hero_image}
                alt=""
                className="w-full h-[300px] sm:h-[400px] lg:h-[600px] xl:h-full object-cover rounded-3xl"
                width={1920}
                height={1080}
              />
            </div>
          </div>

          <div className="description mt-16 grid grid-cols-12 gap-10">
            <div className="left col-span-12 md:col-span-7">
              <div className="text-[35px] md:text-[40px] lg:text-[55px] font-[600] mb-4">
                {t("project_description")}
              </div>
              <div className="text-[17px] font-[400] opacity-80">
                <div
                  dangerouslySetInnerHTML={{ __html: projectData?.description }}
                />
              </div>
            </div>
            <div className="divider col-span-12 md:col-span-1 flex items-center justify-center">
              <div className="w-full md:w-[1px] h-[1px] md:h-full bg-gray-300"></div>
            </div>
            <div className="right col-span-12 md:col-span-4">
              <div className="text-[25px] font-[600] mb-4">
                {t("key_details")}
              </div>
              <div className="text-[17px] font-[400] opacity-80">
                <ul className="flex flex-col gap-5 w-full">
                  {[
                    {
                      id: 1,
                      key: t("space"),
                      value: projectData?.home_area,
                    },
                    {
                      id: 2,
                      key: t("year_built"),
                      value: projectData?.year_built,
                    },
                    {
                      id: 3,
                      key: t("location"),
                      value: projectData?.location,
                    },
                  ].map((item) => (
                    <li key={item.id} className="flex items-center gap-2">
                      <div className="icon flex items-center justify-center p-4 rounded-full border border-gray-200">
                        <ShieldCheck className="w-6 h-6 text-black" />
                      </div>
                      <div className="content">
                        <span className="text-[15px] font-[600] opacity-50">
                          {item.key}
                        </span>
                        <h3 className="text-[15px] font-[600]">{item.value}</h3>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="features mt-16">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-16 gap-6">
              <div className="text-[35px] md:text-[40px] lg:text-[55px] font-[600] capitalize">
                {t("features_amenities")}
              </div>

              {/* Filter Buttons - Removed "All Features" button */}
              <div className="flex flex-wrap justify-center lg:justify-end gap-2">
                <button
                  onClick={() => setAmenityFilter("amenity")}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    amenityFilter === "amenity"
                      ? "bg-[#dba426] text-white border-[#dba426]"
                      : "bg-white text-black border-gray-300 hover:border-[#dba426]"
                  }`}
                >
                   {t("Amenities")}
                </button>
                <button
                  onClick={() => setAmenityFilter("outdoor")}
                  className={`px-6 py-3 rounded-full border transition-all duration-300 ${
                    amenityFilter === "outdoor"
                      ? "bg-[#dba426] text-white border-[#dba426]"
                      : "bg-white text-black border-gray-300 hover:border-[#dba426]"
                  }`}
                >
                 {t("Outdoor Features")}
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-16 text-gray-600">
              Showing {filteredAmenities.length} of{" "}
              {projectData?.amenities?.length || 0} features
            </div>

            {/* Amenities Grid */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 gap-y-20">
              {filteredAmenities.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    className="group text-center p-10 bg-gradient-to-b from-[#F6F3EC] to-[#F6F3EC00] rounded-3xl relative flex flex-col transform transition-all duration-300 hover:scale-105"
                  >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full flex items-center justify-center z-0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 320 104"
                        width={150}
                        fill="none"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M0 0H320C290.545 0 267.772 24.6753 253.628 49.8666C235.516 82.1247 200.378 104 160 104C119.622 104 84.4835 82.1247 66.3718 49.8666C52.228 24.6753 29.4552 0 0 0Z"
                          fill="white"
                        ></path>
                      </svg>
                    </div>
                    <div className="icon flex font-[400] items-center justify-center absolute top-[-50px] left-1/2 -translate-x-1/2 bg-[#dba426] text-white rounded-full z-10 p-4 border-10 border-white group-hover:scale-110 transition-all duration-300">
                      {/* Use API image if available, otherwise fallback to default icon */}
                      {item.image && item.image !== "https://arx-test.com/" ? (
                        <Image
                          src={item.image} 
                          alt={item.title}
                          className="w-10 h-10 object-contain"
                          // onError={(e) => {
                          //   // Fallback to default icon if image fails to load
                          //   const IconComponent = featureIcons[index % featureIcons.length] || ShieldCheck;
                          //   // e.target.style.display = 'none';
                          //   // e.target.parentNode.innerHTML = `<div class="w-10 h-10 flex items-center justify-center">${IconComponent}</div>`;
                          // }}
                        />
                      ) : (
                        // Fallback to default icon if no valid image URL
                        (() => {
                          const IconComponent = featureIcons[index % featureIcons.length] || ShieldCheck;
                          return <IconComponent className="w-10 h-10 font-[400]" />;
                        })()
                      )}
                    </div>
                    <div className="content z-10 mt-8">
                      <h3 className="text-[23px] font-[600] mb-2">
                        {item.title}
                      </h3>
                      {/* Type Badge */}
                    </div>
                  </li>
                );
              })}
            </ul>

            {/* No Results Message */}
            {filteredAmenities.length === 0 && (
              <div className="text-center py-20">
                <div className="text-gray-400 text-lg mb-2">
                  No features found
                </div>
                <p className="text-gray-500">
                  Try selecting a different filter option
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full py-30 max-w-7xl mx-auto px-6">
          {/* Interactive tab navigation */}
          <div className="head lg:flex items-center justify-between mb-6">
            <div className="title">
              <h2 className="text-[35px] md:text-[55px] font-[600] mb-4">
                {t("media")}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 p-3 px-6 rounded-full border border-gray-300 transition-all duration-300 ${
                    activeTab === tab.id
                      ? "bg-[#dba426] text-white fil-white"
                      : "bg-white text-black"
                  }`}
                >
                  <span className="fill-white!">{tab.icon}</span>
                  <span className=" uppercase text-sm">{tab.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div
            className={`h-full ${
              activeTab === "photos"
                ? "2xl:ml-[-150px] lg:mr-[-700px]"
                : activeTab === "plan"
                ? projectData?.property_floor_plans?.length &&
                  projectData?.property_floor_plans?.length > 0
                  ? "lg:ml-[-150px] lg:mr-[-700px]"
                  : "ml-[0px] mr-[0px] w-full"
                : ""
            }`}
          >
            {tabs.find((tab) => tab.id === activeTab)?.content}
          </div>
        </div>

        {/* Location Section with Map Image */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="head">
            <h2 className="text-[55px] font-[600] mb-4">{t("location")}</h2>
          </div>
          <div className="content grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="left w-full border border-gray-300 rounded-3xl xl:p-10 p-6 px-5 xl:px-20">
              <div className="border-b border-gray-300 pb-6 mb-4">
                <span className="text-[13px] font-[600] opacity-80 uppercase">
                  {t("address")}
                </span>

                <div className="flex items-end justify-between gap-2">
                  <h3 className="md:text-[30px] text-[20px] font-[600] capitalize">
                    {projectData?.location}
                  </h3>
                  <SectionButton href="#">{t("get_direction")}</SectionButton>
                </div>
              </div>

              <div className="key">
                <div className="title mb-5">
                  <h3 className="text-[25px] font-[600] capitalize">
                    {t("key_transport")}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <ul className="grid grid-cols-2 justify-between gap-8 w-full">
                    {[
                      {
                        id: 1,
                        key: "Coast",
                        value: "300m",
                      },
                      {
                        id: 2,
                        key: "University",
                        value: "750m",
                      },
                      {
                        id: 3,
                        key: "Supermarket",
                        value: "500m",
                      },
                      {
                        id: 4,
                        key: "Park",
                        value: "1120m",
                      },
                      {
                        id: 5,
                        key: "Railway station",
                        value: "1750m",
                      },
                      {
                        id: 6,
                        key: "Airport",
                        value: "3158m",
                      },
                      {
                        id: 7,
                        key: "Bus station",
                        value: "450m",
                      },
                      {
                        id: 8,
                        key: "Bank",
                        value: "415m",
                      },
                      {
                        id: 9,
                        key: "Hospital",
                        value: "350m",
                      },
                    ].map(
                      (item: { id?: number; key: string; value?: string }) => (
                        <li key={item.id}>
                          <h3 className="text-[17px] font-[600] opacity-40">
                            {t(item.key)}
                          </h3>
                          <p className="text-[17px] font-[600] ">
                            {item.value}
                          </p>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div className="w-full h-[300px] md:h-[500px] lg:h-[600px] xl:h-full relative rounded-3xl">
              {/* Map image from import */}
              <iframe
                src={projectData?.location_link || ""}
                width="100%"
                height="100%"
                className="rounded-3xl"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;