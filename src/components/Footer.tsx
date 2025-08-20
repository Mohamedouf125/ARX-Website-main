"use client";
import React, { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useLocale, useTranslations } from "next-intl";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";
import { ProjectType } from "@/libs/types/types";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { AnimatedElement } from "./animations/AnimationType";
import imagelogo from "../../public/arx.png";

const Footer: React.FC = () => {
  const t = useTranslations("header");
  const t2 = useTranslations("footer");
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [bannerImage, setBannerImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch both properties and banner data concurrently
        const [propertiesResponse, bannerResponse] = await Promise.all([
          getData("properties", {}, new AxiosHeaders({ lang: locale })),
          getData("footer-banner", {}, new AxiosHeaders({ lang: locale })),
        ]);

        // Set projects data
        const projectsData = Array.isArray(propertiesResponse?.data?.properties)
          ? propertiesResponse.data.properties
          : [];
        setProjects(projectsData);

        // Set banner image
        if (bannerResponse?.data?.image) {
          setBannerImage(bannerResponse.data.image);
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
        setProjects([]); // fallback to prevent errors
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [locale]);

  // Navigation links configuration
  const navigationLinks = [
    { id: 1, title: "home", link: "/" },
    { id: 2, title: "about", link: "/about" },
    { id: 3, title: "projects", link: "/projects" },
    { id: 4, title: "blog", link: "/blogs" },
    { id: 5, title: "faqs", link: "/faqs" },
    { id: 6, title: "our-team", link: "/our-team" },
    { id: 7, title: "our-services", link: "/services" },
    { id: 8, title: "core-values", link: "/core-values" },
    { id: 9, title: "contact", link: "/contact" },
  ];

  // Contact information configuration
  const contactInfo = [
    {
      id: 1,
      title: "info@arxeg.com",
      link: "mailto:info@arxeg.com",
      icon: <FaEnvelope size={15} className="text-[#DBA426] mt-1" />,
    },
    {
      id: 2,
      title: "16591",
      link: "tel:16591",
      icon: <FaPhone size={15} className="text-[#DBA426] mt-1" />,
    },
    {
      id: 3,
      title: "+201001703888",
      link: "https://wa.me/201001703888",
      icon: <FaSquareWhatsapp size={20} className="text-[#DBA426] mt-1" />,
    },
  ];

  // Social media links configuration
  const socialLinks = [
    { name: "Facebook", url: "https://www.facebook.com/Arxeg/" },
    { name: "Instagram", url: "https://www.instagram.com/arx_development/" },
    { name: "Linkedin", url: "https://eg.linkedin.com/company/arxdevelopment" },
    { name: "Youtube", url: "https://www.youtube.com/@arxdevelopment" },
  ];

  // Address links configuration
  const addressLinks = [
    {
      coordinates: "30.026306,31.489864",
      text: t2("footer_address_3"),
    },
    {
      coordinates: "31.438272,31.664551",
      text: t2("footer_address_2"),
    },
    {
      coordinates: "31.438272,31.664551",
      text: t2("footer_address"),
    },
  ];

  return (
    <div
      className="relative footer p-20 px-5 md:px-10 lg:px-20 pt-48 mt-[-100px] pb-5 bg-cover bg-center bg-no-repeat h-full z-0"
      style={{
        backgroundImage: bannerImage ? `url(${bannerImage})` : "none",
        backgroundColor: bannerImage ? "transparent" : "#1a1a1a", // fallback color
      }}
    >
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>

      {/* Footer Hero Section */}
      <div className="relative h-full z-10 mb-16 md:mb-0">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col hero justify-center items-center relative z-[1] px-5 w-[100%] md:w-[60%] lg:w-[45%] xl:w-[40%] text-center">
            <AnimatedElement
              type="slideUp"
              duration={1}
              className="w-full h-full"
            >
              <div className="justify-center !mb-[5vw] capitalize text-white text-[clamp(0.5rem,2rem+1.5625vw,4.0625rem)] font-bold font-['Lucida Grande'] tracking-tight leading-[1]">
                {t2("footer_hero_title")}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* Footer Big Text */}
      <AnimatedElement type="slideUp" duration={1} className="w-full h-full">
        <div className="flex items-center justify-center">
          <div
            className="z-[1] arx-big-text"
            style={{
              background:
                "linear-gradient(to bottom, #FFFFFF,rgba(255, 255, 255, 0))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
              whiteSpace: "nowrap",
              marginTop: "-200px",
            }}
          >
            <h3
              className="elementor-heading-title elementor-size-default"
              style={{
                fontSize: "10vw",
                fontWeight: "bold",
                letterSpacing: "0.001em",
                lineHeight: "2",
                marginBottom: "-110px",
                color: "#e4ed64",
              }}
            >
              {t2("footer_big_text")}
            </h3>
          </div>
        </div>
      </AnimatedElement>

      {/* Footer Content */}
      <AnimatedElement type="slideUp" duration={1} className="w-full h-full">
        <footer className="pt-16 pb-10 mx-auto rounded-3xl z-10 relative bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-20 px-6 lg:px-10 xl:px-20">
            {/* Logo + Description + Addresses */}
            <div>
              <Image
                src={imagelogo}
                alt="ARX Logo"
                width={104}
                height={48}
                className="h-30 w-auto p-2 rounded-lg mb-10"
              />
              <p className="text-lg font-[500] text-gray-400 leading-6">
                {t("footerDescription")}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-gray-400 flex flex-col gap-4">
                {addressLinks.map((address, index) => (
                  <li key={index}>
                    <a
                      href={`https://maps.google.com/?q=${address.coordinates}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 hover:text-[#DBA426] transition-colors duration-300"
                    >
                      <FaMapMarkerAlt className="text-[#DBA426] w-5 h-5 flex-shrink-0" />
                      {address.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Links */}
            <div className="grid grid-cols-2 gap-5 border-t md:border-t-0 border-b md:border-b-0 border-l border-l-0 md:border-l border-r border-r-0 md:border-r border-gray-300 py-8 md:py-0 px-5 xl:px-10 justify-center">
              <div className="cover">
                <ul className="space-y-6 text-sm">
                  {navigationLinks.map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.link}
                        className="hover:text-[#DBA426] transition font-['Switzer, Sans-serif'] font-[600] text-[16px] leading-[1.5] transition-all duration-300"
                      >
                        {t(item.title)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects Links */}
              <div className="flex flex-col gap-6">
                <Link
                  href="/projects"
                  className="font-[600] text-[16px] leading-[1.5] hover:text-[#DBA426] transition-all duration-300"
                >
                  {t("projects")}
                </Link>
                {!isLoading &&
                  projects.map((item) => (
                    <Link
                      key={`project-${item.id}`}
                      href={`/projects/${item.slug}`}
                      className="font-[600] text-[16px] leading-[1.5] hover:text-[#DBA426] transition-all duration-300"
                    >
                      {item.title}
                    </Link>
                  ))}
                {isLoading && (
                  <div className="text-gray-400 text-sm">
                    Loading projects...
                  </div>
                )}
              </div>
            </div>

            {/* Contact Information */}
            <div className="mt-10 md:mt-0 flex flex-col justify-between">
              <ul className="text-sm font-['Switzer, Sans-serif'] flex flex-col gap-2 items-start">
                {contactInfo.map((item) => (
                  <li
                    className="group relative flex justify-start"
                    key={item.id}
                  >
                    <div className="flex items-center justify-start gap-2 border-b border-[#015B8D] group-hover:border-white transition-all duration-300">
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#015B8D] group-hover:w-full group-hover:left-auto right-0 transition-all duration-300"></div>
                      {item.icon}
                      <a
                        href={item.link}
                        target={
                          item.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          item.link.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="transition flex items-center gap-2 text-[0px] md:text-[20px] lg:text-[25px] font-['Switzer, Sans-serif'] font-[550]"
                      >
                        <span className="text-black text-lg">
                          {item.title}
                        </span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Social Media Links */}
              <ul className="flex items-center justify-start gap-2 mt-10">
                {socialLinks.map((social, index) => (
                  <React.Fragment key={social.name}>
                    <li>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span className="opacity-60 hover:opacity-100 transition-all duration-300">
                          {social.name}
                        </span>
                      </a>
                    </li>
                    {index < socialLinks.length - 1 && (
                      <li>
                        <div className="point w-[4px] h-[4px] bg-[#DBA426] rounded-full opacity-60"></div>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-300 mt-10 pt-4">
            <div className="max-w-7xl mx-auto px-4 text-center">
              <p className="text-md text-gray-500 font-['Switzer, Sans-serif'] font-[500]">
                &copy; {new Date().getFullYear()} ARX Developments
              </p>
            </div>
          </div>
        </footer>
      </AnimatedElement>
    </div>
  );
};

export default Footer;
