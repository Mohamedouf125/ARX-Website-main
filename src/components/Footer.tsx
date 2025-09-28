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

  // Social media links configuration with SVG icons
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/Arxeg/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
        </svg>
      ),
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/arx_development/",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      url: "https://eg.linkedin.com/company/arxdevelopment",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/@arxdevelopment",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      ),
    },
  ];

  // Address links configuration
  const addressLinks = [
    {
      coordinates: "https://maps.google.com/?q=30.026306,31.489864",
      text: t2("footer_address_3"),
    },
    {
      coordinates: "https://maps.google.com/?q=31.438272,31.664551",
      text: t2("footer_address_2"),
    },
    {
      coordinates: "https://maps.app.goo.gl/xbStUfkkbEbtuLFb8?g_st=iw",
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
        <footer className="lg:pt-16 lg:pb-10  mx-auto rounded-3xl z-10 relative bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 lg:mb-20 px-6 lg:px-10 xl:px-20">
            {/* Logo + Description + Addresses */}
            <div>
              <div className="flex justify-center md:block">
                <Image
                  src={imagelogo}
                  alt="ARX Logo"
                  width={104}
                  height={48}
                  className="w-48 md:w-auto h-auto p-2 rounded-lg lg:mb-10"
                />
              </div>
              <p className="text-lg font-[500] text-gray-400 leading-6">
                {t("footerDescription")}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-gray-400 flex flex-col gap-4">
                {addressLinks.map((address, index) => (
                  <li key={index}>
                    <a
                      href={`${address.coordinates}`}
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
            <div className="grid grid-cols-2 gap-5 border-t md:border-t-0 border-b md:border-b-0 border-l border-l-0 md:border-l border-r border-r-0 md:border-r border-gray-300 py-8  px-5 xl:px-10 justify-center">
              <div className="cover">
                <ul className="lg:space-y-6 space-y-2 text-sm">
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
              <div className="flex flex-col lg:gap-6  gap-2.5">
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

            {/* Contact Information - Desktop & Mobile Styles */}
            <div className="lg:mt-10 md:mt-0 flex flex-col justify-between items-stretch w-full">
              {/* Desktop Style */}
              <ul className="hidden md:block text-sm font-['Switzer, Sans-serif']">
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
                        <span className="text-black lg:text-lg md:2xl text-xl">
                          {item.title}
                        </span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Mobile Style - Full Width */}
              <ul className="md:hidden text-sm font-['Switzer, Sans-serif'] flex flex-col gap-1 w-full">
                {contactInfo.map((item) => (
                  <li className="group relative w-full" key={item.id}>
                    <div className="flex items-center justify-start gap-2 w-full border-b border-transparent group-hover:border-[#DBA426] transition-all duration-300 ">
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#DBA426] group-hover:w-full transition-all duration-300"></div>
                      <div className="flex-shrink-0">{item.icon}</div>
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
                        className="transition flex-1 text-black text-lg font-['Switzer, Sans-serif'] font-[550] hover:text-[#DBA426] break-words"
                      >
                        {item.title}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Social Media Links - Mobile (Grid with SVG icons) */}
              <ul className="flex   md:hidden w-full">
                {socialLinks.map((social) => (
                  <li key={social.name} className="flex justify-center">
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`opacity-60 hover:opacity-100 transition-all duration-300 text-center text-gray-600 hover:text-[#DBA426] ${
                        locale === "ar" ? "ml-3" : "mr-3"
                      } my-2`}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Social Media Links - Desktop (Flex with SVG icons and text) */}
              <ul className="hidden md:flex items-center justify-start gap-2 mt-10">
                {socialLinks.map((social, index) => (
                  <React.Fragment key={social.name}>
                    <li>
                      <a
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 opacity-60 hover:opacity-100 transition-all duration-300 text-gray-600 hover:text-[#DBA426]"
                      >
                        <span className="w-4 h-4 lg:hidden md:hidden block">
                          {social.icon}
                        </span>
                        <span>{social.name}</span>
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
          <div className="border-t border-gray-300 lg:mt-10 mt-4 pt-4">
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
