"use client";

import React, { useEffect, useRef } from "react";
import { Home, ArrowLeft, Search, Globe } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const t = useTranslations("notFound");
  const locale = useLocale();
  const isRTL = locale === "ar";

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      shapeRefs.current.forEach((shape, index) => {
        if (shape) {
          const speed = (index + 1) * 0.3;
          const xPos = (x - 0.5) * speed * 15;
          const yPos = (y - 0.5) * speed * 15;
          shape.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
      });
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    {
      name: t("quickLinks.home"),
      href: `/${locale}`,
      icon: Home,
      gradient: "from-[#DBA426] to-[#DBA426]/80",
    },
    {
      name: t("quickLinks.projects"),
      href: `/${locale}/projects`,
      icon: Globe,
      gradient: "from-[#DBA426]/90 to-[#DBA426]/70",
    },
    {
      name: t("quickLinks.contact"),
      href: `/${locale}/contact`,
      icon: Search,
      gradient: "from-[#DBA426]/80 to-[#DBA426]/60",
    },
  ];

  return (
    <body className="min-h-screen py-[150px] flex items-center justify-center p-2.5 bg-gradient-to-br from-gray-900 via-black to-gray-800 overflow-x-hidden relative">
      {/* Enhanced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(219,164,38,0.1)_0%,transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,rgba(219,164,38,0.05)_60deg,transparent_120deg,rgba(219,164,38,0.03)_180deg,transparent_240deg,rgba(219,164,38,0.05)_300deg,transparent_360deg)] animate-spin-slow"></div>
      </div>

      {/* Enhanced Floating Shapes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div
            key={i}
            ref={(el) => {
              shapeRefs.current[i] = el;
            }}
            className="floating-shape absolute rounded-full bg-gradient-to-br from-[#DBA426]/30 to-[#DBA426]/10 backdrop-blur-sm border border-[#DBA426]/20"
            style={{
              width: i === 0 ? "120px" : i === 1 ? "100px" : i === 2 ? "80px" : i === 3 ? "60px" : i === 4 ? "40px" : i === 5 ? "30px" : i === 6 ? "25px" : "20px",
              height: i === 0 ? "120px" : i === 1 ? "100px" : i === 2 ? "80px" : i === 3 ? "60px" : i === 4 ? "40px" : i === 5 ? "30px" : i === 6 ? "25px" : "20px",
              top: i === 0 ? "10%" : i === 1 ? "25%" : i === 2 ? "45%" : i === 3 ? "65%" : i === 4 ? "80%" : i === 5 ? "15%" : i === 6 ? "35%" : "75%",
              left: i === 0 ? "5%" : i === 1 ? "75%" : i === 2 ? "15%" : i === 3 ? "85%" : i === 4 ? "60%" : i === 5 ? "40%" : i === 6 ? "90%" : "10%",
              animationDelay: i === 0 ? "-2s" : i === 1 ? "-1s" : i === 2 ? "-3s" : i === 3 ? "-4s" : i === 4 ? "-5s" : i === 5 ? "-1.5s" : i === 6 ? "-2.5s" : "-3.5s",
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`geo-${i}`}
            className="absolute animate-pulse"
            style={{
              width: i === 0 ? "60px" : i === 1 ? "40px" : i === 2 ? "80px" : "50px",
              height: i === 0 ? "60px" : i === 1 ? "40px" : i === 2 ? "80px" : "50px",
              top: i === 0 ? "20%" : i === 1 ? "70%" : i === 2 ? "40%" : "85%",
              left: i === 0 ? "80%" : i === 1 ? "10%" : i === 2 ? "90%" : "30%",
              background: i === 0 ? "linear-gradient(45deg, #DBA426, transparent)" : 
                          i === 1 ? "linear-gradient(135deg, transparent, #DBA426)" :
                          i === 2 ? "linear-gradient(225deg, #DBA426, transparent)" :
                          "linear-gradient(315deg, transparent, #DBA426)",
              clipPath: i === 0 ? "polygon(50% 0%, 0% 100%, 100% 100%)" :
                        i === 1 ? "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)" :
                        i === 2 ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" :
                        "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              opacity: 0.1,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className={`container-animate relative z-10 w-full max-w-2xl bg-black/40 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden border border-[#DBA426]/30 hover:border-[#DBA426]/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(219,164,38,0.3)] ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Enhanced Header */}
        <div className="header-shimmer relative h-40 bg-gradient-to-br from-[#DBA426] via-[#DBA426]/90 to-[#DBA426]/80 flex items-center justify-center overflow-hidden">
          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]"></div>
          </div>
          
          {/* Enhanced Logo Container */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-36 h-36 rounded-full bg-gradient-to-br from-white/20 to-white/5 backdrop-blur-sm border-2 border-[#DBA426]/40 animate-pulse"></div>
            <div className="absolute w-32 h-32 rounded-full bg-gradient-to-br from-[#DBA426]/20 to-transparent animate-spin-slow"></div>
          </div>
          
          {/* Logo with Enhanced Effects */}
          <div className="relative z-10 w-32 h-32 rounded-full bg-gradient-to-br from-white via-white to-[#DBA426] border-4 border-white shadow-2xl transition-all duration-500 hover:scale-110 hover:rotate-6 hover:shadow-[0_0_30px_rgba(219,164,38,0.5)] overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <img
              src="/images/logo.svg"
              alt="ARX Logo"
              className="w-full h-full object-contain rounded-full relative z-10"
            />
          </div>
          
          {/* Floating Particles around Logo */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 bg-[#DBA426] rounded-full animate-pulse"
              style={{
                top: `${50 + Math.sin(i * 60 * Math.PI / 180) * 40}%`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 40}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${2 + i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Content */}
        <div className={`p-10 bg-gradient-to-b from-black/60 to-gray-900/60 backdrop-blur-sm relative overflow-hidden ${isRTL ? 'text-right' : 'text-left'}`}>
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(219,164,38,0.1)_0%,transparent_50%)]"></div>
            <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(219,164,38,0.1)_0%,transparent_50%)]"></div>
          </div>
          
          {/* Enhanced 404 Number */}
          <div className="text-center mb-8 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#DBA426]/20 to-transparent animate-pulse"></div>
            </div>
            <h1 className="text-9xl font-black error-number pulse-animate mb-6 font-['Lato'] relative z-10 drop-shadow-2xl">
              404
            </h1>
            <div className="relative">
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-[#DBA426] via-[#DBA426]/90 to-[#DBA426]/80 bg-clip-text text-transparent font-['Lato'] drop-shadow-lg">
                {t("title")}
              </h2>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-[#DBA426] to-transparent rounded-full"></div>
            </div>
            <p className="text-xl text-gray-300 mb-8 font-['Lato'] leading-relaxed max-w-lg mx-auto">
              {t("description")}
            </p>
          </div>

          {/* Enhanced Quick Links */}
          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-bold text-center mb-8 bg-gradient-to-r from-[#DBA426] via-[#DBA426]/90 to-[#DBA426]/80 bg-clip-text text-transparent font-['Lato'] drop-shadow-lg">
              {t("quickLinks.title")}
            </h3>
            {quickLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className={`item-animate flex gap-4 items-center p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#DBA426]/30 cursor-pointer transition-all duration-300 hover:scale-105 hover:bg-[#DBA426]/15 hover:shadow-2xl hover:shadow-[#DBA426]/25 hover:border-[#DBA426]/50 group relative overflow-hidden ${isRTL ? 'hover:-translate-x-2' : 'hover:translate-x-2'}`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Hover Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#DBA426]/5 via-[#DBA426]/10 to-[#DBA426]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Enhanced Icon */}
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6 group-hover:shadow-[0_0_20px_rgba(219,164,38,0.4)] flex-shrink-0 relative z-10`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <link.icon size={24} className="relative z-10" />
                </div>
                
                {/* Enhanced Text */}
                <span className="flex-1 font-semibold text-gray-200 group-hover:text-[#DBA426] transition-colors duration-300 font-['Lato'] text-lg relative z-10">
                  {link.name}
                </span>
                
                {/* Enhanced Arrow */}
                <span className={`text-[#DBA426] text-xl font-bold transition-all duration-300 group-hover:scale-125 group-hover:text-white relative z-10 ${isRTL ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                  {isRTL ? "←" : "→"}
                </span>
                
                {/* Subtle Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-[#DBA426]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </Link>
            ))}
          </div>

          {/* Enhanced Back Button */}
          <div className="text-center">
            <button
              onClick={() => window.history.back()}
              className={`group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#DBA426] to-[#DBA426]/80 text-white font-bold shadow-2xl transition-all duration-500 hover:scale-110 hover:shadow-[0_0_30px_rgba(219,164,38,0.5)] hover:from-[#DBA426]/90 hover:to-[#DBA426]/70 font-['Lato'] relative overflow-hidden ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Animated Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 group-hover:translate-x-full"></div>
              
              {/* Icon with Enhanced Animation */}
              <ArrowLeft 
                size={22} 
                className={`transition-all duration-300 group-hover:scale-110 ${isRTL ? 'rotate-180 group-hover:rotate-180' : 'group-hover:-translate-x-1'}`} 
              />
              
              {/* Text with Glow Effect */}
              <span className="relative z-10 drop-shadow-lg">
                {t("backButton")}
              </span>
              
              {/* Subtle Border Glow */}
              <div className="absolute inset-0 rounded-2xl border border-[#DBA426]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </body>
  );
}