"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import { useTranslations } from "next-intl";

interface SmallHeadSpanProps {
  children: React.ReactNode;
  color?: string;
}

// SmallHeadSpan Component (inline for the artifact)
const SmallHeadSpan = ({ children, color = "#dba426" }: SmallHeadSpanProps) => {
  return (
    <div className="mb-6 inline-block">
      <div
        className="px-6 py-2 border border-amber-500 rounded-full overflow-hidden relative"
        style={{ borderColor: color }}
      >
        <div className="flex animate-pulse">
          <span
            className="text-xs font-bold uppercase tracking-wider text-amber-600"
            style={{ color }}
          >
            · {children} · {children} · {children} ·
          </span>
        </div>
      </div>
    </div>
  );
};

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
  const i18nTimeline: TimelineItem[] = Array.from({ length: 6 }, (_, idx) => {
    const step = String(idx + 1);
    const stepname = ["one", "two", "three", "four", "five", "six"];
    const images = [
      "/aboutServices/leasing1.png",
      "/pngimg.png",
      "/pngimg.png",
      "/pngimg.png",
      "/pngimg.png",
      "/pngimg.png",
    ];
    return {
      year: step,
      // Put the step description into title to match current renderer
      title: t(`steps.${stepname[idx]}.description`),
      image: images[idx],
    };
  });
  const data: TimelineItem[] = timelineData ?? i18nTimeline;
  const swiperRef = useRef<SwiperType | null>(null);
  const centerSectionRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleSmoothScroll = useCallback(() => {
    if (!mounted || !centerSectionRef.current || !swiperRef.current || isMobile)
      return;

    const centerSection = centerSectionRef.current;
    const swiper = swiperRef.current;

    const rect = centerSection.getBoundingClientRect();
    const sectionHeight = centerSection.offsetHeight;
    const windowHeight = window.innerHeight;

    // Only start animation when section reaches the top of the page
    // Calculate progress only after the section top reaches viewport top
    let progress = 0;

    if (rect.top <= 0) {
      // Section has reached the top, now calculate scroll progress within the section
      const scrolledDistance = Math.abs(rect.top);
      const totalScrollDistance = sectionHeight - windowHeight;

      if (totalScrollDistance > 0) {
        progress = Math.min(1, scrolledDistance / totalScrollDistance);
      }
    }

    setScrollProgress(progress);

    // Only move swiper if there's actual progress
    if (progress > 0) {
      const targetTimelineIndex = Math.floor(progress * data.length);
      const clampedTimelineIndex = Math.max(
        0,
        Math.min(data.length - 1, targetTimelineIndex)
      );
      const targetSlide = clampedTimelineIndex + 1;

      if (swiper.activeIndex !== targetSlide) {
        swiper.slideTo(targetSlide, 200);
      }
    } else {
      // Reset to first slide when section hasn't reached top yet
      if (swiper.activeIndex !== 1) {
        swiper.slideTo(1, 200);
      }
    }

    animationFrameRef.current = requestAnimationFrame(handleSmoothScroll);
  }, [mounted, data.length, isMobile]);

  useEffect(() => {
    if (!mounted || isMobile) return;

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
  }, [handleSmoothScroll]);

  const getActiveDotIndex = () => {
    const progressPerItem = 1 / data.length;
    const calculatedIndex = Math.floor(scrollProgress / progressPerItem);
    return Math.min(calculatedIndex, data.length - 1);
  };

  const getItemAnimationProgress = useCallback(
    (itemIndex: number) => {
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
    [scrollProgress, data.length]
  );

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white" />
    );
  }

  // Mobile Version
  if (isMobile) {
    return (
      <section className={`max-w-[1920px] mx-auto ${className}`}>
        <div className="px-6 py-12 bg-gradient-to-b from-white to-gray-50">
          <div className="text-center mb-12">
            <SmallHeadSpan>OUR STORY</SmallHeadSpan>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">40+ Years</h1>
            <p className="text-xl text-gray-600">of remarkable journey</p>
          </div>

          <div className="space-y-16">
            {data.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center">
                  {/* Year Display - No scaling */}
                  <div className="relative mb-8">
                    <div className="absolute inset-0 bg-yellow-300 opacity-20 blur-3xl"></div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-500">
                      {item.year}
                    </div>
                  </div>

                  {/* Image Container - No scaling */}
                  <div className="mb-8 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-2xl blur-2xl opacity-30"></div>
                    <img
                      src={item.image}
                      alt={`Milestone ${item.year}`}
                      className="relative w-40 h-40 object-contain filter drop-shadow-2xl"
                    />
                  </div>

                  {/* Timeline Connector */}
                  <div className="relative mb-8">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse"></div>
                    {index < data.length - 1 && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gradient-to-b from-amber-400 to-transparent"></div>
                    )}
                  </div>

                  {/* Description */}
                  <div className="max-w-sm px-4">
                    <p className="text-gray-700 text-center leading-relaxed">
                      {item.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Desktop Version - Fixed to not move until section reaches top
  return (
    <section
      ref={centerSectionRef}
      className={`h-[250vh] max-w-[1920px] mx-auto relative ${className}`}
      style={{
        background: `linear-gradient(180deg, 
          #ffffff 0%, 
          #fafafa 25%, 
          #f5f5f5 50%, 
          #fafafa 75%, 
          #ffffff 100%)`,
      }}
    >
      <div className="sticky top-16 h-screen flex flex-col justify-center px-8 py-12 z-20">
        {/* Header - minimal parallax, no scaling */}
        <div
          className="pb-20 w-full max-w-7xl mx-auto"
          style={{
            transform: `translateY(${scrollProgress * -10}px)`,
            opacity: 1 - scrollProgress * 0.2,
          }}
        >
          <SmallHeadSpan>OUR STORY</SmallHeadSpan>
          <h1 className="text-7xl font-black text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500">
              40+ Years
            </span>
          </h1>
          <p className="text-3xl text-gray-700 font-light">
            of remarkable journey
          </p>
        </div>

        {/* Swiper Container */}
        <div className="w-full relative">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            slidesPerView={4}
            spaceBetween={80}
            allowTouchMove={false}
            centeredSlides={false}
            speed={80}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 40 },
              1024: { slidesPerView: 3, spaceBetween: 60 },
              1280: { slidesPerView: 4, spaceBetween: 80 },
            }}
            className="w-full relative z-10"
          >
            {/* Empty slide at the beginning */}
            <SwiperSlide key="start-space">
              <div className="w-full h-full opacity-0"></div>
            </SwiperSlide>

            {data.map((item, index) => {
              const activeDotIndex = getActiveDotIndex();
              const isActive = index <= activeDotIndex;
              const isPassed = index < activeDotIndex;
              const itemProgress = getItemAnimationProgress(index);
              const isHovered = hoveredIndex === index;

              // No scaling - only opacity and position changes
              const yearOpacity = 0.5 + itemProgress * 0.5;
              const imageOpacity = 0.6 + itemProgress * 0.4;
              const textOpacity = 0.4 + itemProgress * 0.6;

              return (
                <SwiperSlide key={index}>
                  <div
                    className="w-full h-full flex items-center justify-center px-4 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    <div className="flex flex-col items-center max-w-xs mx-auto">
                      {/* Year Display - No scaling, only opacity */}
                      <div
                        className="relative mb-4"
                        style={{
                          opacity: yearOpacity,
                          transition: "opacity 0.3s ease-out",
                        }}
                      >
                        <div
                          className="absolute inset-0 bg-yellow-300 blur-3xl"
                          style={{ opacity: itemProgress * 0.3 }}
                        ></div>
                        <div className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-500">
                          {item.year}
                        </div>
                      </div>

                      {/* Image Container - No scaling, only opacity */}
                      <div
                        className="relative mb-0"
                        style={{
                          opacity: imageOpacity,
                          transition: "opacity 0.3s ease-out",
                        }}
                      >
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-2xl blur-2xl"
                          style={{
                            opacity: itemProgress * 0.4 + (isHovered ? 0.2 : 0),
                          }}
                        ></div>
                        <img
                          src={item.image}
                          alt={`Milestone ${item.year}`}
                          className="relative w-48 h-48 object-contain filter drop-shadow-2xl"
                          style={{
                            filter: `drop-shadow(0 20px 40px rgba(0,0,0,${
                              0.1 + itemProgress * 0.2
                            }))`,
                          }}
                        />
                      </div>

                      {/* Timeline Indicator - No scaling on dots */}
                      <div className="relative z-20 flex items-center justify-center mb-6">
                        {/* Connecting lines */}
                        {index > 0 && (
                          <div
                            className="absolute right-full h-1 transition-all duration-300"
                            style={{
                              width: "calc(25vw - 50px)",
                              background: isActive
                                ? "linear-gradient(90deg, transparent, #fbbf24)"
                                : "#e5e7eb",
                              opacity: isActive ? 1 : 0.5,
                            }}
                          ></div>
                        )}

                        {index < data.length - 1 && (
                          <div
                            className="absolute left-full h-1 transition-all duration-300"
                            style={{
                              width: "calc(25vw - 50px)",
                              background: isPassed
                                ? "linear-gradient(90deg, #fbbf24, transparent)"
                                : "#e5e7eb",
                              opacity: isPassed ? 1 : 0.5,
                            }}
                          ></div>
                        )}

                        {/* Dot with glow - no scaling */}
                        <div className="relative">
                          {isActive && (
                            <div
                              className="absolute inset-0 rounded-full animate-ping"
                              style={{
                                background: "#fbbf24",
                                opacity: 0.4,
                              }}
                            ></div>
                          )}
                          <div
                            className="w-10 h-10 rounded-full border-4 border-white relative z-10 transition-all duration-300"
                            style={{
                              background: isActive
                                ? "linear-gradient(135deg, #fbbf24, #f59e0b)"
                                : "#e5e7eb",
                              boxShadow: isActive
                                ? "0 0 30px rgba(251, 191, 36, 0.6), 0 4px 15px rgba(0, 0, 0, 0.1)"
                                : "0 2px 8px rgba(0, 0, 0, 0.1)",
                            }}
                          ></div>
                        </div>
                      </div>

                      {/* Description - Only opacity change */}
                      <div
                        className="text-center max-w-xs px-4"
                        style={{
                          opacity: textOpacity,
                          transition: "opacity 0.3s ease-out",
                        }}
                      >
                        <p className="text-gray-700 text-sm leading-relaxed font-light">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}

            {/* Empty slide at the end */}
            <SwiperSlide key="end-space">
              <div className="w-full h-full opacity-0"></div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default TimelineSwiper;
