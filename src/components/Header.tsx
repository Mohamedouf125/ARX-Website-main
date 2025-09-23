"use client";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const params = useParams();
  const [language, setLanguage] = useState(
    params.locale === "ar" ? "Ar" : "En"
  );
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileLangMenuOpen, setIsMobileLangMenuOpen] = useState(false);
  const t = useTranslations("header");
  
  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setIsLangMenuOpen(false);
    setIsMobileLangMenuOpen(false);

    // Update the locale based on the selected language
    const newLocale = lang === "Ar" ? "ar" : "en";

    // Redirect to the same path but with the new locale
    window.location.href = `/${newLocale}${window.location.pathname.replace(
      /^\/(en|ar)/,
      ""
    )}`;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Close mobile lang menu when closing main menu
    if (isMobileMenuOpen) {
      setIsMobileLangMenuOpen(false);
    }
  };

  const navLinks = [
    {
      label: t("home"),
      href: "/",
    },
    {
      label: t("about"),
      href: "/about",
    },
    {
      label: t("projects"),
      href: "/projects",
    },
    {
      label: t("blog"),
      href: "/blogs",
    },
    {
      label: t("our_team"),
      href: "/our-team",
    },
    {
      label: t("leasing"),
      href: "/leasing",
    },
    {
      label: t("contact"),
      href: "/contact",
    },
  ];

  return (
    <header className="w-full z-50 flex justify-center">
      <div className="px-[25px] lg:px-[10px] top-5 w-[95%] md:w-[99%] lg:w-[95%] mx-auto py-3 z-50 rounded-3xl md:rounded-full fixed bg-black/30 backdrop-blur-sm lg:px-[clamp(10px,16.614582vw,50px)] xl:px-[clamp(10px,16.614582vw,200px)]">
        <div className="flex justify-between items-center md:py-1">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Image
              src="https://storage.googleapis.com/furniture-hub/arx/settings/ARX%20Logo%20(1).png"
              alt="Logo"
              width={104}
              height={48}
              className=" h-8 md:h-12 w-auto"
            />
          </Link>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="flex items-center p-2 text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((item) => (
              <div key={item.href}>
                <Link
                  href={`${item.href}`}
                  className="text-[14px] lg:text-[16px] text-white font-[500] font-['Lato'] capitalize tracking-wide py-2 transition-colors hover:text-[#DBA426]"
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </nav>

          {/* Language selector */}
          <div className="hidden md:flex items-center relative">
            <button
              className="flex items-center text-white font-bold font-['Lato'] text-sm"
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            >
              <img
                className="w-6 h-6 rounded-full overflow-hidden me-1.5"
                src={`/images/${language.toLocaleLowerCase()}.svg`}
                alt="lang"
              />
              {language}
              <svg
                className={`ml-1 h-4 w-4 transition-transform ${
                  isLangMenuOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              {isLangMenuOpen && (
                <div className="absolute top-full right-0 mt-2 w-24 bg-white rounded-md shadow-lg overflow-hidden z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleLanguageChange("En")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange("Ar")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Arabic
                    </button>
                  </div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - slides from right with liquid glass effect */}
      <div
        className={`fixed top-0 right-0 h-full w-[80%] transform transition-transform duration-300 ease-in-out z-50 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.18)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)'
        }}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={toggleMobileMenu}
            className="text-white hover:text-[#DBA426] hover:bg-white/10 hover:scale-110 transition-all duration-300 p-2 rounded-full"
            aria-label="Close menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-2 h-[calc(100vh-80px)] overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={`${item.href}`}
                className="text-white font-bold font-['Lato'] capitalize tracking-wide py-4 hover:text-[#DBA426] hover:bg-white/5 hover:px-3 hover:rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#DBA426]/20"
                onClick={toggleMobileMenu}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Language Selector - matching desktop design */}
          <div className="mt-8 pt-4" style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.18)'
          }}>
            <div className="relative">
              <button
                className="flex items-center text-white font-bold font-['Lato'] text-sm w-full justify-between hover:bg-white/5 hover:rounded-lg px-2 py-2 transition-all duration-300 hover:scale-105"
                onClick={() => setIsMobileLangMenuOpen(!isMobileLangMenuOpen)}
              >
                <div className="flex items-center">
                  <img
                    className="w-6 h-6 rounded-full overflow-hidden me-1.5"
                    src={`/images/${language.toLocaleLowerCase()}.svg`}
                    alt="lang"
                  />
                  {language}
                </div>
                <svg
                  className={`h-4 w-4 transition-transform ${
                    isMobileLangMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              
              {isMobileLangMenuOpen && (
                <div 
                  className="mt-2 w-full rounded-md shadow-lg overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                  }}
                >
                  <div className="py-1">
                    <button
                      onClick={() => handleLanguageChange("En")}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/15 hover:scale-105 hover:text-[#DBA426] transition-all duration-300 flex items-center group"
                    >
                      <img
                        className="w-4 h-4 rounded-full overflow-hidden me-2 group-hover:scale-110 transition-transform duration-300"
                        src="/images/en.svg"
                        alt="English"
                      />
                      English
                    </button>
                    <button
                      onClick={() => handleLanguageChange("Ar")}
                      className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-white/15 hover:scale-105 hover:text-[#DBA426] transition-all duration-300 flex items-center group"
                    >
                      <img
                        className="w-4 h-4 rounded-full overflow-hidden me-2 group-hover:scale-110 transition-transform duration-300"
                        src="/images/ar.svg"
                        alt="Arabic"
                      />
                      Arabic
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Overlay when mobile menu is open */}
      {isMobileMenuOpen && (
        <div
          className="fixed w-screen h-screen inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;