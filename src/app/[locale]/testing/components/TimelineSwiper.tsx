"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { useLocale, useTranslations } from "next-intl";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import "swiper/css";

interface TimelineItem {
  year: string;
  title: string;
  image: string;
}

interface TimelineSwiperProps {
  timelineData?: TimelineItem[];
  className?: string;
}

const TimelineSwiper: React.FC<TimelineSwiperProps> = ({
  timelineData = [
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
    }
  ],
  className = "",
}) => {
  const t = useTranslations("about");
  const locale = useLocale();

  // Swiper refs and states
  const swiperRef = useRef<SwiperType | null>(null);
  const centerSectionRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Animation frame ref for smooth scrolling
const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);
    
    // Check if it's mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Smooth scroll handler with requestAnimationFrame
  const handleSmoothScroll = useCallback(() => {
    if (!mounted || !centerSectionRef.current || !swiperRef.current || isMobile) return;

    const centerSection = centerSectionRef.current;
    const swiper = swiperRef.current;

    const rect = centerSection.getBoundingClientRect();
    const sectionHeight = centerSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate scroll progress through the center section
    const progress = Math.max(
      0,
      Math.min(
        1,
        (windowHeight - rect.top) / (windowHeight + sectionHeight * 1.2)
      )
    );

    setScrollProgress(progress);

    // Total slides: 1 start space + timeline items + 1 end space
    const totalSlides = 1 + timelineData.length + 1; // start + timeline + end

    // Calculate target slide based on scroll progress
    const targetSlide = Math.floor(progress * (totalSlides - 1));

    // Clamp the target slide to valid range
    const clampedTargetSlide = Math.max(
      0,
      Math.min(totalSlides - 1, targetSlide)
    );

    if (swiper.activeIndex !== clampedTargetSlide) {
      swiper.slideTo(clampedTargetSlide, 300);
    }

    // Continue animation loop
    animationFrameRef.current = requestAnimationFrame(handleSmoothScroll);
  }, [mounted, timelineData.length, isMobile]);

  useEffect(() => {
    if (!mounted || isMobile) return;

    // Throttled scroll handler to trigger smooth animation
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(handleSmoothScroll);
        ticking = true;
        
        // Reset ticking flag
        setTimeout(() => {
          ticking = false;
        }, 16); // ~60fps
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    
    // Initial call
    handleSmoothScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleSmoothScroll]);

  // Calculate which dots should be active based on scroll progress
  const getActiveDotIndex = () => {
    const progressPerItem = 1 / timelineData.length;
    const calculatedIndex = Math.floor(scrollProgress / progressPerItem * 1.5);
    // Clamp the result to ensure it doesn't exceed the array bounds
    return Math.min(calculatedIndex, timelineData.length - 1);
  };

  // Individual item animation progress
  const getItemAnimationProgress = useCallback((itemIndex: number) => {
    const totalItems = timelineData.length;
    const itemProgressStart = itemIndex / totalItems;
    const itemProgressEnd = (itemIndex + 1) / totalItems;
    
    if (scrollProgress < itemProgressStart) return 0;
    if (scrollProgress > itemProgressEnd) return 1;
    
    return (scrollProgress - itemProgressStart) / (itemProgressEnd - itemProgressStart);
  }, [scrollProgress, timelineData.length]);

  if (!mounted) {
    return <div className="min-h-screen bg-gray-100" />;
  }

  // Mobile version - not sticky, shows cards individually
  if (isMobile) {
    return (
      <section className={`max-w-[1920px] mx-auto ${className}`}>
        {/* Header */}
        <div className={`${locale === "ar" ? "text-right" : "text-left"} px-4 py-8 bg-white`}>
          <SmallHeadSpan>{t("OUR_STORY")}</SmallHeadSpan>
          <h1 className="text-3xl sm:text-4xl font-bold text-black mb-8">
            {t("40+")}<br />
            <span className="text-gray-900">{t("remarkable journey")}</span>
          </h1>
        </div>

        {/* Mobile Timeline Cards */}
        <div className="px-4 bg-white">
          {timelineData.map((item, index) => (
            <div key={index} className="mb-12 last:mb-0">
              <div className="flex flex-col items-center text-center">
                {/* Year */}
                <div className="text-5xl font-bold text-[#e4ed64] mb-4">
                  {item.year}
                </div>

                {/* Image */}
                <div className="mb-6">
                  <img
                    src={item.image}
                    alt={`Building ${item.year}`}
                    className="w-32 h-32 object-contain filter drop-shadow-lg"
                  />
                </div>

                {/* Timeline connector */}
                <div className="flex flex-col items-center mb-6">
                  <div className={`w-6 h-6 rounded-full shadow-lg border-2 border-white transition-colors duration-500 bg-[#e4ed64]`}></div>
                  {index < timelineData.length - 1 && (
                    <div className="w-0.5 h-8 bg-[#e4ed64] mt-2"></div>
                  )}
                </div>

                {/* Description */}
                <div className="max-w-sm">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop version - sticky behavior with smooth animations
  return (
    <section
      ref={centerSectionRef}
      className={`h-[350vh] max-w-[1920px] mx-auto relative ${className}`}
    >
      <div className="sticky top-20 h-screen flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-white z-20">
        {/* Header with gentle movement */}
        <div
          className={`${
            locale === "ar" ? "text-right" : "text-left"
          } pb-26 w-full max-w-7xl mx-auto transition-transform duration-300 ease-out`}
          style={{
            transform: `translateY(${scrollProgress * -8}px)`
          }}
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
            speed={300}
            breakpoints={{
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
                <div className="flex flex-col items-center max-w-xs mx-auto opacity-0">
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent -ml-4 sm:-ml-8 -mb-8 sm:-mb-12">
                    &nbsp;
                  </div>
                  <div className="relative mb-16 sm:mb-20">
                    <div className="w-full h-32 sm:h-40 lg:h-48 flex items-center rounded-md justify-center">
                    </div>
                  </div>
                  <div className="relative z-20 flex items-center justify-center">
                    <div className="w-7 sm:w-9 h-7 sm:h-9 bg-transparent rounded-full relative z-10"></div>
                  </div>
                  <div className="mb-3 sm:mb-4"></div>
                </div>
              </div>
            </SwiperSlide>

            {timelineData.map((item, index) => {
              const activeDotIndex = getActiveDotIndex();
              const isActive = index <= activeDotIndex;
              const itemProgress = getItemAnimationProgress(index);
              
              // Smooth movement animations (always visible)
              const yearScale = 0.96 + (itemProgress * 0.08);
              const yearTranslateY = (1 - itemProgress) * 10;
              
              const imageScale = 0.94 + (itemProgress * 0.12);
              const imageTranslateY = (1 - itemProgress) * 15;
              
              const textTranslateY = (1 - itemProgress) * 8;
              
              return (
                <SwiperSlide key={index}>
                  <div className="w-full h-full flex items-center justify-center px-2">
                    <div className="flex flex-col items-center max-w-xs mx-auto">
                      {/* Year with smooth movement */}
                      <div 
                        className="text-6xl sm:text-5xl lg:text-7xl font-bold text-[#e4ed64] -ml-4 sm:-ml-8 -mb-8 sm:-mb-12 transition-all duration-300 ease-out"
                        style={{
                          transform: `scale(${yearScale}) translateY(${yearTranslateY}px)`
                        }}
                      >
                        {item.year}
                      </div>

                      {/* Building/House Image with smooth movement */}
                      <div 
                        className="relative mb-16 sm:mb-20 transition-all duration-400 ease-out"
                        style={{
                          transform: `scale(${imageScale}) translateY(${imageTranslateY}px)`
                        }}
                      >
                        <div className="w-full h-32 sm:h-40 lg:h-38 flex items-center rounded-md justify-center">
                          <img
                            src={item.image}
                            alt={`Building ${item.year}`}
                            className="max-w-full min-w-[100px] sm:min-w-[140px] lg:min-w-[180px] max-h-full object-contain filter drop-shadow-2xl"
                          />
                        </div>
                      </div>

                      {/* Indicator Dot with connecting line */}
                      <div className="relative z-20 flex items-center justify-center">
                        {/* Left line segment */}
                        {index > 0 && (
                          <div
                            className={`absolute right-1/2 w-full h-1 hidden sm:block transition-all duration-500 ease-out ${
                              isActive ? 'bg-[#e4ed64]' : 'bg-gray-300'
                            }`}
                            style={{ 
                              width: "calc(25vw - 50px)",
                              transform: `scaleX(${isActive ? 1 : 0.8})`,
                              transformOrigin: 'right center'
                            }}
                          ></div>
                        )}

                        {/* Right line segment */}
                        {index < timelineData.length - 1 && (
                          <div
                            className={`absolute left-1/2 w-full h-1 hidden sm:block transition-all duration-500 ease-out ${
                              isActive ? 'bg-[#e4ed64]' : 'bg-gray-300'
                            }`}
                            style={{ 
                              width: "calc(30vw - 50px)",
                              transform: `scaleX(${isActive ? 1 : 0.8})`,
                              transformOrigin: 'left center'
                            }}
                          ></div>
                        )}

                        {/* The dot */}
                        <div 
                          className={`w-7 sm:w-9 h-7 sm:h-9 rounded-full shadow-lg border-2 sm:border-4 border-white relative z-10 transition-all duration-500 ease-out ${
                            isActive ? 'bg-[#e4ed64]' : 'bg-gray-300'
                          }`}
                          style={{
                            transform: `scale(${isActive ? 1.1 : 0.95})`,
                            boxShadow: isActive ? '0 0 15px rgba(228, 237, 100, 0.4)' : '0 4px 6px rgba(0, 0, 0, 0.1)'
                          }}
                        ></div>
                      </div>
                      <div className="mb-3 sm:mb-4"></div>

                      {/* Description with smooth movement */}
                      <div 
                        className="text-center max-w-xs px-2 transition-all duration-400 ease-out"
                        style={{
                          transform: `translateY(${textTranslateY}px)`
                        }}
                      >
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {/* Empty slide at the end for spacing */}
            <SwiperSlide key="end-space">
              <div className="w-full h-full flex items-center justify-center px-2">
                <div className="flex flex-col items-center max-w-xs mx-auto opacity-0">
                  <div className="text-6xl sm:text-7xl lg:text-8xl font-bold text-transparent -ml-4 sm:-ml-8 -mb-8 sm:-mb-12">
                    &nbsp;
                  </div>
                  <div className="relative mb-16 sm:mb-20">
                    <div className="w-full h-32 sm:h-40 lg:h-48 flex items-center rounded-md justify-center">
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
  );
};

export default TimelineSwiper;