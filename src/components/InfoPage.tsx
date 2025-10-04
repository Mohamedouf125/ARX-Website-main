"use client";

import React, { useEffect, useRef } from "react";
import {
  Globe,
  Facebook,
  Linkedin,
  Instagram,
  Youtube,
  MapPin,
} from "lucide-react";
import { FaTiktok, FaThreads } from "react-icons/fa6";
import { useTranslations, useLocale } from "next-intl";

export default function ARXLandingPage() {
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("infoPage");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      shapeRefs.current.forEach((shape, index) => {
        if (shape) {
          const speed = (index + 1) * 0.5;
          const xPos = (x - 0.5) * speed * 20;
          const yPos = (y - 0.5) * speed * 20;
          shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const socialLinks = [
    {
      icon: Globe,
      name: t("socialLinks.website"),
      url: "https://www.arxeg.com/en",
      gradient: "from-slate-700 to-blue-500",
    },
    {
      icon: Facebook,
      name: t("socialLinks.facebook"),
      url: "https://www.facebook.com/Arxeg",
      gradient: "from-blue-600 to-blue-500",
    },
    {
      icon: Linkedin,
      name: t("socialLinks.linkedin"),
      url: "https://www.linkedin.com/company/arxdevelopment/posts/?feedView=all",
      gradient: "from-blue-700 to-blue-400",
    },
    {
      icon: Instagram,
      name: t("socialLinks.instagram"),
      url: "https://www.instagram.com/arx_development",
      gradient: "from-pink-600 to-purple-600",
    },
    {
      icon: FaTiktok,
      name: t("socialLinks.tiktok"),
      url: "https://www.tiktok.com/@arxdevelopment",
      gradient: "from-black to-black",
    },
    {
      icon: Youtube,
      name: t("socialLinks.youtube"),
      url: "https://www.youtube.com/channel/UCZf2FMMztacNcBE74KWF",
      gradient: "from-red-600 to-red-700",
    },
    {
      icon: FaThreads,
      name: t("socialLinks.threads"),
      url: "https://www.threads.com/@arx_development",
      gradient: "from-black to-black",
    },
  ];

  const branches = [
    {
      name: t("branches.newDamietta"),
      url: "https://maps.google.com/?q=31.438414,31.664598",
      gradient: "from-red-600 to-red-500",
    },
    {
      name: t("branches.newCairo"),
      url: "https://maps.google.com/?q=30.026306,31.489864",
      gradient: "from-red-600 to-red-400",
    },
    {
      name: t("branches.mansoura"),
      url: "https://www.google.com/maps/place/31%C2%B003'00.3%22N+31%C2%B023'43.3%22E/@31.0500934,31.3952445,21z",
      gradient: "from-red-600 to-red-400",
    },
  ];

  const projects = [
    {
      name: t("projects.kentroTower"),
      url: "https://maps.app.goo.gl/nWhBvKKTK34Ru4LW6?g_st=iw",
      image: "https://arx-test.com/storage/data1/1.svg",
    },
    {
      name: t("projects.bariq"),
      url: "https://maps.app.goo.gl/ttS79BXhPuqhoBUf8?g_st=awb",
      image: "https://arx-test.com/storage/data1/4.svg",
    },
    {
      name: t("projects.uni"),
      url: "https://maps.app.goo.gl/snLXfxZTVaXf56Vp7?g_st=awb",
      image: "https://arx-test.com/storage/data1/2.svg",
    },
    {
      name: t("projects.aura"),
      url: "https://maps.app.goo.gl/AKcgWy612ZDVvG7d6?g_st=awb",
      image: "https://arx-test.com/storage/data1/6.svg",
    },
    {
      name: t("projects.miraj"),
      url: "https://maps.app.goo.gl/UCxTArqtQocPrRKe8?g_st=awb",
      image: "https://arx-test.com/storage/data1/7.svg",
    },
    {
      name: t("projects.o7"),
      url: "https://maps.app.goo.gl/cxAPtFh7uMgKW3NU7?g_st=awb",
      image: "https://arx-test.com/storage/data1/5.svg",
    },
    {
      name: t("projects.laVie"),
      url: "https://maps.app.goo.gl/uY54auWSVP2gmv317?g_st=awb",
      image: "https://arx-test.com/storage/data1/3.svg",
    },
  ];

  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) translateY(-100%) rotate(45deg);
          }
          100% {
            transform: translateX(100%) translateY(100%) rotate(45deg);
          }
        }
        @keyframes fadeInUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .floating-shape {
          animation: float 6s ease-in-out infinite;
        }
        .container-animate {
          animation: slideUp 0.8s ease-out;
        }
        .header-shimmer::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: shimmer 3s linear infinite;
        }
        .item-animate {
          animation: fadeInUp 0.6s ease-out both;
        }
      `}</style>

      <div className="min-h-screen py-[150px] flex items-center justify-center p-2.5 bg-gradient-to-br from-blue-50 to-blue-100 overflow-x-hidden">
        {/* Floating Shapes */}
        <div className="fixed inset-0 pointer-events-none z-0">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              ref={(el) => {
                shapeRefs.current[i] = el;
              }}
              className="floating-shape absolute rounded-full bg-white/10"
              style={{
                width: i === 0 ? "80px" : i === 1 ? "60px" : "40px",
                height: i === 0 ? "80px" : i === 1 ? "60px" : "40px",
                top: i === 0 ? "20%" : i === 1 ? "60%" : "80%",
                left: i === 0 ? "10%" : i === 1 ? "80%" : "20%",
                animationDelay: i === 0 ? "-2s" : i === 1 ? "-1s" : "-3s",
              }}
            />
          ))}
        </div>

        {/* Main Container */}
        <div className={`container-animate relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/20 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
          {/* Header */}
          <div className="header-shimmer relative h-32 bg-gradient-to-br from-blue-900 via-blue-700 to-blue-500 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-28 h-28 rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/20" />
            </div>
            <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-white via-white to-blue-900 border-4 border-white shadow-xl transition-transform hover:scale-110 hover:rotate-6 overflow-hidden">
              <img
                src="https://qci.qr-code.click/uploads/links/qtYpxPvCs5vMfmuCBHj6Z2YEx2rpGZCtlnQV9oD3.jpg"
                alt="ARX Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
          </div>

          {/* Content */}
          <div className={`p-10 bg-gradient-to-b from-white/90 to-gray-50/90 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-slate-700 to-blue-500 bg-clip-text text-transparent">
              {t("title")}
            </h1>

            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-slate-700 to-blue-500 bg-clip-text text-transparent">
              {t("findMeOn")}
            </h2>

            {/* Social Links */}
            <div className="space-y-2 mb-8">
              {socialLinks.map((link, index) => (
                <div
                  key={link.name}
                  onClick={() => window.open(link.url, "_blank")}
                  className={`item-animate flex gap-2 items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 cursor-pointer transition-all hover:scale-105 hover:bg-white/80 hover:shadow-lg group ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-6 flex-shrink-0`}
                  >
                    <link.icon size={20} />
                  </div>
                  <span className="flex-1 font-semibold text-slate-700 group-hover:text-blue-500 transition-colors">
                    {link.name}
                  </span>
                  <span className={`text-blue-500 text-lg font-bold transition-transform group-hover:scale-125 ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                    {isRTL ? "←" : "→"}
                  </span>
                </div>
              ))}

              {/* Branch Locations */}
              {branches.map((branch, index) => (
                <div
                  key={branch.name}
                  onClick={() => window.open(branch.url, "_blank")}
                  className={`item-animate flex gap-2 items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 cursor-pointer transition-all hover:scale-105 hover:bg-white/80 hover:shadow-lg group ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                  style={{
                    animationDelay: `${(socialLinks.length + index) * 0.1}s`,
                  }}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${branch.gradient} flex items-center justify-center text-white shadow-lg transition-transform group-hover:scale-110 flex-shrink-0`}
                  >
                    <MapPin size={20} />
                  </div>
                  <span className="flex-1 font-semibold text-slate-700 group-hover:text-blue-500 transition-colors">
                    {branch.name}
                  </span>
                  <span className={`text-blue-500 text-lg font-bold transition-transform group-hover:scale-125 ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                    {isRTL ? "←" : "→"}
                  </span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-center mb-6 bg-gradient-to-r from-slate-700 to-blue-500 bg-clip-text text-transparent">
              {t("ourProjects")}
            </h2>

            {/* Projects */}
            <div className="space-y-2">
              {projects.map((project, index) => (
                <div
                  key={project.name}
                  onClick={() => window.open(project.url, "_blank")}
                  className={`item-animate gap-2 flex items-center p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 cursor-pointer transition-all hover:scale-105 hover:bg-white/80 hover:shadow-lg group ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-11 h-11 rounded-xl overflow-hidden shadow-lg transition-transform group-hover:scale-110 group-hover:-rotate-6 flex-shrink-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <img
                      src={project.image}
                      alt={`${project.name} Logo`}
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <span className="flex-1 font-semibold text-slate-700 group-hover:text-blue-500 transition-colors">
                    {project.name}
                  </span>
                  <span className={`text-blue-500 text-lg font-bold transition-transform group-hover:scale-125 ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                    {isRTL ? "←" : "→"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
