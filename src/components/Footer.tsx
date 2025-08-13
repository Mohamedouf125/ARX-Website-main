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
  const locale = useLocale();

  useEffect(() => {
    const feachData = async () => {
      try {
        const response = await getData(
          "properties",
          {},
          new AxiosHeaders({
            lang: locale,
          })
        );
        setProjects(response.data);
      } catch (error) {
        throw error;
      }
    };

    feachData();
  }, []);

  // const buttonRef = useRef<HTMLButtonElement>(null);
  // const [position, setPosition] = useState({ x: 0, y: 0 });
  // const [isHovered, setIsHovered] = useState(false);
  // const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  // const [scale, setScale] = useState(1);
  // const [opacity, setOpacity] = useState(1);

  // useEffect(() => {
  //   if (!isHovered) {
  //     // Smoothly return to original position when not hovered
  //     const returnAnimation = () => {
  //       setPosition((prev) => {
  //         const dx = (0 - prev.x) * 0.1;
  //         const dy = (0 - prev.y) * 0.1;

  //         if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
  //           return {
  //             x: prev.x + dx,
  //             y: prev.y + dy,
  //           };
  //         }
  //         return { x: 0, y: 0 };
  //       });

  //       if (Math.abs(position.x) > 0.1 || Math.abs(position.y) > 0.1) {
  //         requestAnimationFrame(returnAnimation);
  //       }
  //     };

  //     returnAnimation();
  //     setScale(1);
  //     return;
  //   }

  //   const animate = () => {
  //     setPosition((prev) => {
  //       // Dynamic easing based on distance
  //       const distance = Math.sqrt(
  //         Math.pow(targetPosition.x - prev.x, 2) +
  //           Math.pow(targetPosition.y - prev.y, 2)
  //       );
  //       const easingFactor = Math.min(0.3, 0.05 + distance * 0.005);

  //       return {
  //         x: prev.x + (targetPosition.x - prev.x) * easingFactor,
  //         y: prev.y + (targetPosition.y - prev.y) * easingFactor,
  //       };
  //     });

  //     requestAnimationFrame(animate);
  //   };

  //   const animationFrame = requestAnimationFrame(animate);
  //   return () => cancelAnimationFrame(animationFrame);
  // }, [isHovered, targetPosition]);

  // const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
  //   if (!buttonRef.current) return;

  //   const rect = buttonRef.current.getBoundingClientRect();
  //   // More pronounced movement effect
  //   const x = (e.clientX - rect.left - rect.width / 2) * 0.6;
  //   const y = (e.clientY - rect.top - rect.height / 2) * 0.6;

  //   setTargetPosition({ x, y });
  //   // Subtle scale and opacity changes
  //   setScale(1.05);
  //   setOpacity(0.95);
  // };

  // const handleMouseLeave = () => {
  //   setIsHovered(false);
  //   setTargetPosition({ x: 0, y: 0 });
  //   setScale(1);
  //   setOpacity(1);
  // };

  // const handleMouseEnter = () => {
  //   setIsHovered(true);
  //   setScale(1.03);
  // };

  return (
    <div className="relative footer p-20 px-5 md:px-10 lg:px-20 pt-48 mt-[-100px] pb-5 bg-[url('/footer-bg.jpg3.jpg')] bg-cover bg-center bg-no-repeat h-full z-0">
      <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-0"></div>

      {/* footer hero */}
      <div className="relative h-full z-10 mb-16 md:mb-0">
        <div className=" flex items-center justify-center h-full">
          <div className="flex flex-col hero justify-center items-center relative z-[1] px-5 w-[100%] md:w-[60%] lg:w-[45%] xl:w-[40%] text-center">
            <AnimatedElement
              type="slideUp"
              duration={1}
              className="w-full h-full"
            >
              <div className="justify-center  !mb-[5vw] capitalize text-white text-[clamp(0.5rem,2rem+1.5625vw,4.0625rem)] font-bold font-['Lucida Grande'] tracking-tight leading-[1]">
                {t2("footer_hero_title")}
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* footer big text */}
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
            {/* Logo + Description */}
            <div>
              <Image
                // src="https://storage.googleapis.com/furniture-hub/arx/settings/ARX%20Logo%20(1).png"
                src={imagelogo}
                alt="ARX Logo"
                width={104}
                height={48}
                className="h-30 w-auto   p-2 rounded-lg mb-10"
              />
              <p className="text-lg font-[500] text-gray-400 leading-6">
                {t("footerDescription")}
              </p>
              <ul className="mt-4 space-y-1 text-sm text-gray-400 flex flex-col gap-4 ">
                <li className="">
                  <a
                    href="https://maps.google.com/?q=30.026306,31.489864"
                    target="_blank"
                    className="flex gap-2"
                  >
                    <FaMapMarkerAlt className="text-[#DBA426] w-5 h-5" />
                    {t2("footer_address_3")}
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://maps.google.com/?q=31.438272,31.664551"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-[#DBA426] w-5 h-5" />
                    {t2("footer_address_2")}
                  </a>
                </li>
                <li className="">
                  <a
                    href="https://maps.google.com/?q=31.438272,31.664551"
                    target="_blank"
                    className="flex items-center gap-2"
                  >
                    <FaMapMarkerAlt className="text-[#DBA426] w-5 h-5" />
                    {t2("footer_address")} 

                  </a>
                </li>
              </ul>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-5 border-t md:border-t-0 border-b md:border-b-0 border-l border-l-0 md:border-l border-r border-r-0 md:border-r border-gray-300 py-8 md:py-0 px-5 xl:px-10 justify-center">
              <div className="cover">
                <ul className="space-y-6 text-sm">
                  {[
                    {
                      id: 1,
                      title: t("home"),
                      link: "/",
                    },
                    {
                      id: 2,
                      title: t("about"),
                      link: "/about",
                    },
                    {
                      id: 3,
                      title: t("projects"),
                      link: "/projects",
                    },
                    {
                      id: 4,
                      title: t("blog"),
                      link: "/blogs",
                    },
                    {
                      id: 5,
                      title: t("faqs"),
                      link: "/faqs",
                    },
                    {
                      id: 6,
                      title: t("our-team"),
                      link: "/our-team",
                    },
                    {
                      id: 7,
                      title: t("our-services"),
                      link: "/services",
                    },
                    {
                      id: 8,
                      title: t("core-values"),
                      link: "/core-values",
                    },
                    {
                      id: 9,
                      title: t("contact"),
                      link: "/contact",
                    },
                  ].map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.link}
                        className="hover:text-[#DBA426] transition font-['Switzer, Sans-serif'] font-[600] text-[16px] leading-[1.5] transition-all duration-300"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Projects */}
              <div className="flex flex-col gap-6">
                {[
                  {
                    id: 1,
                    title: t("projects"),
                    link: "/projects",
                  },
                  ...projects.map((item, index) => ({
                    id: index + 1,
                    title: item.title,
                    link: `/projects/${item.id}`,
                  })),
                ].map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    className="font-[600] text-[16px] leading-[1.5] hover:text-[#DBA426] transition-all duration-300"
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Us */}
            <div className="mt-10 md:mt-0 flex flex-col justify-between">
              <ul className="text-sm font-['Switzer, Sans-serif'] flex flex-col gap-2 items-start">
                {[
                  {
                    id: 1,
                    title: "info@arxeg.com",
                    link: "mailto:info@arxeg.com",
                    icon: (
                      <FaEnvelope size={15} className="text-[#DBA426] mt-1" />
                    ),
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
                    icon: (
                      <FaSquareWhatsapp
                        size={20}
                        className="text-[#DBA426] mt-1"
                      />
                    ),
                  },
                ].map((item, index) => (
                  <li className="group relative flex justify-start" key={index}>
                    <div className="flex items-center justify-start gap-2 border-b border-[#015B8D] group-hover:border-white transition-all duration-300">
                      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#015B8D] group-hover:w-full  group-hover:left-auto right-0 transition-all duration-300"></div>
                      {item.icon}
                      <a
                        href={item.link}
                        className="transition flex items-center gap-2 text-[0px] mdtext-[20px] lg:text-[25px] font-['Switzer, Sans-serif'] font-[550]"
                      >
                        <span>{item.title}</span>
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

              <ul className="flex items-center justify-start gap-2 mt-10">
                <li>
                  <a href="https://www.facebook.com/Arxeg/" target="_blank">
                    <span className="opacity-60 hover:opacity-100 transition-all duration-300">
                      Facebook
                    </span>
                  </a>
                </li>
                <li>
                  <div className="point w-[4px] h-[4px] bg-[#DBA426] rounded-full opacity-60"></div>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/arx_development/"
                    target="_blank"
                  >
                    <span className="opacity-60 hover:opacity-100 transition-all duration-300">
                      Instagram
                    </span>
                  </a>
                </li>
                <li>
                  <div className="point w-[4px] h-[4px] bg-[#DBA426] rounded-full opacity-60"></div>
                </li>
                <li>
                  <a
                    href="https://eg.linkedin.com/company/arxdevelopment"
                    target="_blank"
                  >
                    <span className="opacity-60 hover:opacity-100 transition-all duration-300">
                      Linkedin
                    </span>
                  </a>
                </li>
                <li>
                  <div className="point w-[4px] h-[4px] bg-[#DBA426] rounded-full opacity-60"></div>
                </li>
                <li>
                  <a href="https://www.youtube.com/@arxeg" target="_blank">
                    <span className="opacity-60 hover:opacity-100 transition-all duration-300">
                      Youtube
                    </span>
                  </a>
                </li>
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
