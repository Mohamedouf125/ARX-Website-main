"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRightIcon } from "lucide-react";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";

// interface SmallHeadSpanProps {
//   children: React.ReactNode;
//   color?: string;
// }

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
  timelineData,
  className = "",
}) => {
  const t = useTranslations("leasing");
  const locale = useLocale();
  const i18nTimeline: TimelineItem[] = Array.from({ length: 6 }, (_, idx) => {
    const step = `${t("step")} ${idx + 1}`;
    const stepname = ["one", "two", "three", "four", "five", "six"];
    const images = [
      "/aboutServices/one.png",
      "/aboutServices/two.png",
      "/aboutServices/three.png",
      "/aboutServices/four.png",
      "/aboutServices/five.png",
      "/aboutServices/six.png",
    ];
    return {
      year: step,
      title: t(`steps.${stepname[idx]}.description`),
      image: images[idx],
    };
  });

  const data: TimelineItem[] = timelineData ?? i18nTimeline;
  const swiperRef = useRef<SwiperType | null>(null);
  const centerSectionRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [screenSize, setScreenSize] = useState<"sm" | "md" | "lg" | "xl">("lg");
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);

    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize("sm");
      else if (width < 768) setScreenSize("md");
      else if (width < 1024) setScreenSize("lg");
      else setScreenSize("xl");
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => {
      window.removeEventListener("resize", updateScreenSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleSmoothScroll = useCallback(() => {
    // Only enable scroll-based movement on larger screens
    if (
      !mounted ||
      !centerSectionRef.current ||
      !swiperRef.current ||
      screenSize === "sm"
    )
      return;

    const centerSection = centerSectionRef.current;
    const swiper = swiperRef.current;

    const rect = centerSection.getBoundingClientRect();
    const sectionHeight = centerSection.offsetHeight;
    const windowHeight = window.innerHeight;

    let progress = 0;

    if (rect.top <= 0) {
      const scrolledDistance = Math.abs(rect.top);
      const totalScrollDistance = sectionHeight - windowHeight;

      if (totalScrollDistance > 0) {
        progress = Math.min(1, scrolledDistance / totalScrollDistance);
      }
    }

    setScrollProgress(progress);

    if (progress > 0) {
      const targetTimelineIndex = Math.floor(progress * data.length);
      const clampedTimelineIndex = Math.max(
        0,
        Math.min(data.length - 1, targetTimelineIndex)
      );
      const targetSlide = clampedTimelineIndex;

      if (swiper.activeIndex !== targetSlide) {
        swiper.slideTo(targetSlide, 200);
      }
    } else {
      if (swiper.activeIndex !== 0) {
        swiper.slideTo(0, 200);
      }
    }

    animationFrameRef.current = requestAnimationFrame(handleSmoothScroll);
  }, [mounted, data.length, screenSize]);

  useEffect(() => {
    if (!mounted) return;

    // Only add scroll listener for larger screens
    if (screenSize === "sm") {
      return;
    }

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
        animationFrameRef.current = requestAnimationFrame(handleSmoothScroll);
        ticking = true;

        setTimeout(() => {
          ticking = false;
        }, 16);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    handleSmoothScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [handleSmoothScroll, screenSize]);

  const getActiveDotIndex = () => {
    if (screenSize === "sm") {
      // For mobile, use the active slide index state
      return activeSlideIndex;
    }

    const progressPerItem = 1 / data.length;
    const calculatedIndex = Math.floor(scrollProgress / progressPerItem);
    return Math.min(calculatedIndex, data.length - 1);
  };

  const getItemAnimationProgress = useCallback(
    (itemIndex: number) => {
      if (screenSize === "sm") {
        // For mobile, show full progress for active and previous items
        return activeSlideIndex >= itemIndex ? 1 : 0;
      }

      const totalItems = data.length;
      const itemProgressStart = itemIndex / totalItems;
      const itemProgressEnd = (itemIndex + 1) / totalItems;

      if (scrollProgress < itemProgressStart) return 0;
      if (scrollProgress > itemProgressEnd) return 1;

      return (
        (scrollProgress - itemProgressStart) /
        (itemProgressEnd - itemProgressStart)
      );
    },
    [scrollProgress, data.length, screenSize, activeSlideIndex]
  );

  // Responsive configuration
  const getResponsiveConfig = () => {
    switch (screenSize) {
      case "sm":
        return {
          slidesPerView: 1,
          spaceBetween: 20,
          imageSize: "w-32 h-32",
          dotSize: "w-6 h-6",
          yearSize: "text-3xl sm:text-4xl",
          titleSize: "text-sm",
          connectionWidth: "calc(100vw - 100px)",
        };
      case "md":
        return {
          slidesPerView: 2,
          spaceBetween: 30,
          imageSize: "w-36 h-36",
          dotSize: "w-8 h-8",
          yearSize: "text-4xl sm:text-5xl",
          titleSize: "text-sm",
          connectionWidth: "calc(50vw - 75px)",
        };
      case "lg":
        return {
          slidesPerView: 3,
          spaceBetween: 40,
          imageSize: "w-40 h-40",
          dotSize: "w-8 h-8",
          yearSize: "text-5xl lg:text-6xl",
          titleSize: "text-sm",
          connectionWidth: "calc(33.33vw - 60px)",
        };
      default: // xl
        return {
          slidesPerView: 4,
          spaceBetween: 60,
          imageSize: "w-48 h-48",
          dotSize: "w-10 h-10",
          yearSize: "text-6xl xl:text-7xl",
          titleSize: "text-base",
          connectionWidth: "calc(25vw - 50px)",
        };
    }
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" />
    );
  }

  const config = getResponsiveConfig();

  return (
    <section
      ref={centerSectionRef}
      className={`${
        screenSize === "sm"
          ? "h-auto"
          : "h-[200vh] sm:h-[220vh] md:h-[240vh] lg:h-[250vh]"
      } max-w-[1920px] mx-auto relative ${className}`}
      style={{
        background: `linear-gradient(180deg, 
          #ffffff 0%, 
          #fafafa 25%, 
          #f5f5f5 50%, 
          #fafafa 75%, 
          #ffffff 100%)`,
      }}
    >
      <div
        className={`${
          screenSize === "sm" ? "relative" : "sticky top-8 sm:top-12 md:top-16"
        } ${
          screenSize === "sm" ? "h-auto" : "h-screen"
        } flex flex-col justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-12 z-20`}
      >
        {/* Enhanced Header */}
        <div
          className="pb-6 sm:pb-8 md:pb-10 w-full max-w-7xl mx-auto text-center sm:text-start"
          style={
            screenSize === "sm"
              ? {}
              : {
                  transform: `translateY(${scrollProgress * -15}px)`,
                  opacity: 1 - scrollProgress * 0.3,
                }
          }
        >
          <SmallHeadSpan>{t("leasing steps")}</SmallHeadSpan>
          <h1 className="text-[clamp(20px,2.604vw,500px)] font-black text-gray-900 mb-2 sm:mb-4">
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600"
              style={{
                filter: `drop-shadow(0 4px 8px rgba(251, 191, 36, 0.3))`,
              }}
            >
              {t("heading")}
            </span>
          </h1>
          <p className="text-[clamp(10px,1.042vw,200px)] text-gray-700 font-light max-w-3xl">
            {t("intro")}
          </p>
        </div>

        {/* Enhanced Swiper Container */}
        <div className="w-full relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              if (screenSize === "sm") {
                setActiveSlideIndex(swiper.activeIndex);
              }
            }}
            modules={[Navigation]}
            slidesPerView={config.slidesPerView}
            spaceBetween={config.spaceBetween}
            allowTouchMove={screenSize === "sm"}
            centeredSlides={false}
            speed={120}
            navigation={
              screenSize === "sm"
                ? {
                    nextEl: ".swiper-button-next-timeline",
                    prevEl: ".swiper-button-prev-timeline",
                  }
                : false
            }
            className="w-full relative z-10"
          >
            {data.map((item, index) => {
              const activeDotIndex = getActiveDotIndex();
              const isActive = index <= activeDotIndex;
              const isPassed = index < activeDotIndex;
              const itemProgress = getItemAnimationProgress(index);
              const isHovered = hoveredIndex === index;

              // Enhanced animation values
              const yearOpacity = 0.3 + itemProgress * 0.7;
              const yearScale = 0.9 + itemProgress * 0.1;
              const imageOpacity = 0.4 + itemProgress * 0.6;
              const imageScale =
                0.95 + itemProgress * 0.05 + (isHovered ? 0.05 : 0);
              const textOpacity = 0.2 + itemProgress * 0.8;
              const glowIntensity = itemProgress * 0.6 + (isHovered ? 0.3 : 0);

              return (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-full flex items-center justify-center px-2 sm:px-4 cursor-pointer transition-all duration-500"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      transform: `translateY(${isHovered ? -8 : 0}px)`,
                    }}
                  >
                    <div className="flex flex-col items-center max-w-xs mx-auto ">
                      {/* Enhanced Year Display */}
                      <div
                        className="relative mb-3 sm:mb-4 md:mb-6"
                        style={{
                          opacity: yearOpacity,
                          transform: `scale(${yearScale})`,
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <div
                          className={`text-[clamp(15px,2.042vw,200px)] font-black text-transparent bg-clip-text bg-[#dba426] relative z-10`}
                          style={{
                            filter: `drop-shadow(0 4px 12px rgba(251, 191, 36, ${glowIntensity}))`,
                          }}
                        >
                          {item.year}
                        </div>
                      </div>

                      {/* Enhanced Image Container */}
                      <div
                        className="relative mb-4 sm:mb-6"
                        style={{
                          opacity: imageOpacity,
                          transform: `scale(${imageScale})`,
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <div
                          className="absolute inset-0 bg-[#dba52600] rounded-3xl blur-xl sm:blur-2xl"
                          style={{
                            opacity: glowIntensity,
                            transform: `scale(${1.2 + glowIntensity * 0.3})`,
                          }}
                        ></div>
                        <img
                          src={item.image}
                          alt={`Milestone ${item.year}`}
                          className={`relative ${config.imageSize} object-contain transition-all duration-500`}
                          style={{
                            filter: `drop-shadow(0 ${
                              8 + glowIntensity * 20
                            }px ${20 + glowIntensity * 20}px rgba(0,0,0,${
                              0.1 + glowIntensity * 0.2
                            }))`,
                          }}
                        />
                      </div>

                      {/* Enhanced Timeline Indicator */}
                      <div className="relative z-20 flex items-center justify-center mb-4 sm:mb-6">
                        {/* Enhanced Connecting lines */}
                        {index > 0 && (
                          <div
                            className="absolute right-full h-1 transition-all duration-700"
                            style={{
                              width: config.connectionWidth,
                              background: isPassed
                                ? `linear-gradient(90deg, #fbbf24, transparent)`
                                : "#e5e7eb",
                              opacity: isPassed ? 1 : 0.3,
                              boxShadow: isPassed
                                ? `0 0 8px rgba(251, 191, 36, 0.5)`
                                : "none",
                            }}
                          ></div>
                        )}

                        {index < data.length - 1 && (
                          <div
                            className="absolute left-full h-1 transition-all duration-700"
                            style={{
                              width: config.connectionWidth,
                              background: isActive
                                ? `linear-gradient(90deg, #fbbf24, transparent)`
                                : "#e5e7eb",
                              opacity: isActive ? 1 : 0.3,
                              boxShadow: isActive
                                ? `0 0 8px rgba(251, 191, 36, 0.5)`
                                : "none",
                            }}
                          ></div>
                        )}

                        {/* Enhanced Dot with advanced glow */}
                        <div className="relative">
                          {isActive && (
                            <>
                              <div
                                className="absolute inset-0 rounded-full animate-ping"
                                style={{
                                  background:
                                    "radial-gradient(circle, #fbbf24, transparent)",
                                  opacity: 0.6,
                                  transform: "scale(1.5)",
                                }}
                              ></div>
                              <div
                                className="absolute inset-0 rounded-full animate-pulse"
                                style={{
                                  background: "#fbbe24e2",
                                  opacity: 0.3,
                                  transform: "scale(2)",
                                  filter: "blur(8px)",
                                }}
                              ></div>
                            </>
                          )}
                          <div
                            className={`${config.dotSize} rounded-full border-2 sm:border-4 border-white relative z-10 transition-all duration-500`}
                            style={{
                              background: isActive
                                ? "linear-gradient(135deg, #fbbf24, #f59e0b, #d97706)"
                                : "#e5e7eb",
                              boxShadow: isActive
                                ? `0 0 ${
                                    20 + glowIntensity * 20
                                  }px rgba(251, 191, 36, ${
                                    0.8 + glowIntensity * 0.4
                                  }), 0 4px 15px rgba(0, 0, 0, 0.2)`
                                : "0 2px 8px rgba(0, 0, 0, 0.1)",
                              transform: `scale(${
                                isActive ? 1.1 + glowIntensity * 0.2 : 1
                              })`,
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Enhanced Description */}
                      <div
                        className="text-center max-w-xs px-2 sm:px-4"
                        style={{
                          opacity: textOpacity,
                          transform: `translateY(${(1 - itemProgress) * 10}px)`,
                          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                        }}
                      >
                        <p
                          className={`text-gray-700 ${config.titleSize} leading-relaxed font-light`}
                        >
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Navigation Arrows for Mobile */}
          {screenSize === "sm" && (
            <div
              className={` flex justify-center gap-4 mt-6`}
            >
              <button
                className={`${
                  "swiper-button-prev-timeline"
                } w-10 h-10 rounded-full bg-[#dba426] text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95`}
              >
                <ArrowRightIcon className={`w-5 h-5 ${locale === "ar" ? "" : "rotate-180"}`} />
              </button>
              <button
                className={`${
                 "swiper-button-next-timeline"
                } w-10 h-10 rounded-full bg-[#dba426] text-white flex items-center justify-center hover:bg-black transition-colors shadow-lg hover:shadow-xl transform hover:scale-110 active:scale-95`}
              >
                <ArrowRightIcon className={`w-5 h-5 ${locale === "ar" ? "rotate-180" : ""}`} />
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Progress Indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-2">
            {data.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full transition-all duration-500"
                style={{
                  background:
                    index <= getActiveDotIndex()
                      ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                      : "#d1d5db",
                  transform: `scale(${
                    index === getActiveDotIndex() ? 1.3 : 1
                  })`,
                  boxShadow:
                    index <= getActiveDotIndex()
                      ? "0 0 8px rgba(251, 191, 36, 0.6)"
                      : "none",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TimelineSwiper;