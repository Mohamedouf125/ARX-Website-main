"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";

interface TimelineItem {
  year: string;
  title: string;
  image: string;
}

const TimelineSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const swiperRef = useRef<SwiperType | null>(null);
  const swiperContainerRef = useRef<HTMLDivElement>(null);
  // const headerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [isHeaderFixed, setIsHeaderFixed] = useState<boolean>(false);
  const [exitTransition, setExitTransition] = useState<boolean>(false);
  const [swiperVisible, setSwiperVisible] = useState<boolean>(false);
  const [entryAnimationComplete, setEntryAnimationComplete] = useState<boolean>(false);
  const animationRef = useRef<number | null>(null);
  const lastUpdateTime = useRef<number>(0);
  const entryTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const timelineData: TimelineItem[] = [
    {
      year: "1983",
      title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "https://img.freepik.com/premium-psd/luxury-modern-house-isolated-transparent-background_542466-7862.jpg?w=1480",
    },
    {
      year: "1996",
      title: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    },
    {
      year: "2005",
      title: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
      image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    },
    {
      year: "2010",
      title: "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
      year: "2014",
      title: "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
      image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
    },
    {
      year: "2018",
      title: "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    },
    {
      year: "2021",
      title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop",
    },
    {
      year: "2024",
      title: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    },
  ];

  // Enhanced easing with more natural curves
  const easeInOutExpo = useCallback((t: number): number => {
    if (t === 0) return 0;
    if (t === 1) return 1;
    return t < 0.5 ? Math.pow(2, 20 * t - 10) / 2 : (2 - Math.pow(2, -20 * t + 10)) / 2;
  }, []);

  // Smoother interpolation with damping
  const interpolateSmooth = useCallback((current: number, target: number, factor: number = 0.1): number => {
    return current + (target - current) * factor;
  }, []);

  // Main scroll handler with enhanced smoothing and entry animation
  const handleScroll = useCallback(() => {
    if (!sectionRef.current || !swiperRef.current) return;

    const now = Date.now();
    const deltaTime = now - lastUpdateTime.current;

    // Throttle to 60fps max, allow higher frequency for smoother scrolling
    if (deltaTime < 16) return; // Reduced from 8ms to 16ms to prevent excessive calls

    lastUpdateTime.current = now;

    const section = sectionRef.current;
    const rect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = section.offsetHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calculate section boundaries with smoother zones
    const sectionTop = rect.top + scrollTop;
    const sectionBottom = sectionTop + sectionHeight;
    const currentScroll = scrollTop + viewportHeight / 2;

    // Enhanced zones with gentler transitions
    const fixedZoneStart = sectionTop + viewportHeight * 0.35;
    const fixedZoneEnd = sectionBottom - viewportHeight * 0.4;
    const exitTransitionStart = sectionBottom - viewportHeight * -0.9;

    // Header zones with earlier, gentler timing
    const headerFixedStart = sectionTop + viewportHeight * 0.15;
    const headerFixedEnd = sectionBottom - viewportHeight * 0.85;

    const shouldBeFixed =
      currentScroll >= fixedZoneStart && currentScroll <= fixedZoneEnd;
    const shouldHeaderBeFixed =
      currentScroll >= headerFixedStart && currentScroll <= headerFixedEnd;
    const shouldShowExitTransition = currentScroll > exitTransitionStart;

    // Enhanced swiper entry animation logic
    if (shouldBeFixed && !isFixed) {
      setIsFixed(true);
      // Trigger smooth entry animation
      setTimeout(() => {
        setSwiperVisible(true);
        // Mark animation as complete after transition duration
        entryTimeoutRef.current = setTimeout(() => {
          setEntryAnimationComplete(true);
        }, 1000); // Match the CSS transition duration
      }, 50); // Small delay for smoother transition
    } else if (!shouldBeFixed && isFixed) {
      setIsFixed(false);
      setSwiperVisible(false);
      setEntryAnimationComplete(false);
      if (entryTimeoutRef.current) {
        clearTimeout(entryTimeoutRef.current);
      }
    }

    // Smoother state transitions for header
    if (shouldHeaderBeFixed !== isHeaderFixed) {
      setTimeout(
        () => setIsHeaderFixed(shouldHeaderBeFixed),
        shouldHeaderBeFixed ? 0 : 50
      );
    }

    if (shouldShowExitTransition !== exitTransition) {
      setTimeout(
        () => setExitTransition(shouldShowExitTransition),
        shouldShowExitTransition ? 0 : 50
      );
    }

    // Enhanced progress calculation with smoothing
    let progress = 0;
    if (shouldBeFixed) {
      const activeZoneLength = fixedZoneEnd - fixedZoneStart;
      const scrollInActiveZone = currentScroll - fixedZoneStart;
      progress = Math.min(
        Math.max(scrollInActiveZone / activeZoneLength, 0),
        1
      );
    }

    setScrollProgress(progress);

    // Enhanced slide calculation with smoother transitions
    const totalSlides = timelineData.length;
    const exactSlidePosition = progress * (totalSlides - 1);

    // Use a threshold to prevent excessive slide changes
    const slideThreshold = 0.3;
    let targetSlide = Math.round(exactSlidePosition);

    // Only change slide if we've moved significantly
    const slideProgress = exactSlidePosition - Math.floor(exactSlidePosition);
    if (slideProgress < slideThreshold && exactSlidePosition > 0) {
      targetSlide = Math.floor(exactSlidePosition);
    } else if (
      slideProgress > 1 - slideThreshold &&
      exactSlidePosition < totalSlides - 1
    ) {
      targetSlide = Math.ceil(exactSlidePosition);
    }

    // Ultra-smooth slide transitions with variable speed
    if (targetSlide !== currentSlide && swiperRef.current && shouldBeFixed) {
      const slideDistance = Math.abs(targetSlide - currentSlide);

      // Dynamic speed based on distance and scroll velocity
      const baseSpeed = 800;
      const maxSpeed = 1200;
      const minSpeed = 400;

      const speedMultiplier = Math.max(
        0.4,
        Math.min(1, 1 - slideDistance * 0.15)
      );
      let transitionSpeed = Math.max(
        minSpeed,
        Math.min(maxSpeed, baseSpeed * speedMultiplier)
      );

      // Slower transitions for multi-slide jumps
      if (slideDistance > 1) {
        transitionSpeed *= 1.3;
      }

      setCurrentSlide(targetSlide);
      swiperRef.current.slideTo(targetSlide, transitionSpeed, false); // false for smoother transitions
    }
  }, [currentSlide, isFixed, isHeaderFixed, exitTransition, scrollProgress, entryAnimationComplete, easeInOutExpo, interpolateSmooth, timelineData.length]);

  // Ultra-high-performance scroll listener with frame limiting
  useEffect(() => {
    let ticking = false;
    let lastScrollTime = 0;
    const maxFPS = 120; // Higher FPS for ultra-smooth experience
    const frameTime = 1000 / maxFPS;

    const smoothScrollHandler = (timestamp: number) => {
      if (timestamp - lastScrollTime >= frameTime) {
        handleScroll();
        lastScrollTime = timestamp;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        animationRef.current = requestAnimationFrame(smoothScrollHandler);
      }
    };

    // Passive listener for better performance
    window.addEventListener('scroll', onScroll, { 
      passive: true, 
      capture: false 
    });

    // Initial calculation with slight delay for DOM readiness
    const initTimer = setTimeout(() => {
      handleScroll();
    }, 150);

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (entryTimeoutRef.current) {
        clearTimeout(entryTimeoutRef.current);
      }
      clearTimeout(initTimer);
    };
  }, [handleScroll]);

  return (
    <>
      <style jsx>{`
        .timeline-swiper {
          overflow: hidden;
          width: 100%;
        }

        .swiper-container {
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 100;
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          width: 100%;
        }

        .swiper-container.fixed {
          position: fixed;
          top: 70%;
          left: 50%;
          transform: translate(-50%, -50%) translateZ(0);
          width: 100vw;
          max-width: 1920px;
          padding: 0 1rem;
          opacity: 1;
        }

        /* Enhanced Entry Animation States */
        .swiper-container.fixed.entering {
          opacity: 0;
          transform: translate(-50%, -50%) translateZ(0) scale(0.9) translateY(40px);
          filter: blur(8px);
          pointer-events: none;
        }

        .swiper-container.fixed.visible {
          opacity: 1;
          transform: translate(-50%, -50%) translateZ(0) scale(1) translateY(0px);
          filter: blur(0px);
          pointer-events: auto;
        }

        .swiper-container.fixed.exiting {
          opacity: 0;
          transform: translate(-50%, -50%) translateZ(0) scale(0.98) translateY(15px);
          filter: blur(4px);
          pointer-events: none;
        }

        .swiper-container.relative {
          position: relative;
          transform: translateZ(0);
          opacity: 1;
        }

        /* Enhanced Header Fixed Styles */
        .header-container {
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          width: 100%;
        }

        .header-container.fixed {
          position: fixed;
          top: 10%;
          left: 50%;
          transform: translate(-50%, 0) translateZ(0);
          width: 100vw;
          max-width: 1920px;
          padding: 0 1rem;
          opacity: 1;
          z-index: 200;
        }

        .header-container.fixed.exiting {
          opacity: 0;
          transform: translate(-50%, 0) translateZ(0) translateY(-30px) scale(0.98);
          pointer-events: none;
        }

        .header-container.relative {
          position: relative;
          transform: translateZ(0);
          opacity: 1;
        }

        /* Enhanced Timeline Item Animations with Staggered Entry */
        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-item.entering {
          opacity: 0;
          transform: translateZ(0) translateY(30px) scale(0.95);
        }

        .timeline-item.visible {
          opacity: 1;
          transform: translateZ(0) translateY(0px) scale(1);
        }

        .timeline-item.active {
          transform: translateZ(0) scale(1.01);
        }

        .timeline-card {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, box-shadow;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .timeline-card.entering {
          transform: translateZ(0) scale(0.9) rotateY(-5deg);
          opacity: 0.7;
        }

        .timeline-card.visible {
          transform: translateZ(0) scale(1) rotateY(0deg);
          opacity: 1;
        }

        .timeline-card.active {
          transform: translateZ(0) scale(1.02);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.08);
        }

        .timeline-dot-positioned {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateZ(0);
          z-index: 10;
          will-change: transform, box-shadow;
          backface-visibility: hidden;
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-dot-positioned.entering {
          opacity: 0;
          transform: translateX(-50%) translateY(-50%) translateZ(0) scale(0.3);
        }

        .timeline-dot-positioned.visible {
          opacity: 1;
          transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1);
        }

        .timeline-dot-positioned.active {
          transform: translateX(-50%) translateY(-50%) translateZ(0) scale(1.1);
          box-shadow: 0 0 15px rgba(228, 237, 100, 0.3);
        }

        .swiper {
          transform: translateZ(0);
          will-change: transform;
          contain: layout style paint;
        }

        .swiper-slide {
          will-change: transform, opacity;
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          contain: layout style paint;
        }

        .swiper-slide.active-slide {
          opacity: 1;
          transform: translateZ(0) scale(1);
        }

        .swiper-slide:not(.active-slide) {
          opacity: 0.7;
          transform: translateZ(0) scale(0.985);
        }

        /* Staggered animation for slides */
        .swiper-slide:nth-child(1) { transition-delay: 0ms; }
        .swiper-slide:nth-child(2) { transition-delay: 100ms; }
        .swiper-slide:nth-child(3) { transition-delay: 200ms; }
        .swiper-slide:nth-child(4) { transition-delay: 300ms; }
        .swiper-slide:nth-child(5) { transition-delay: 400ms; }
        .swiper-slide:nth-child(6) { transition-delay: 500ms; }
        .swiper-slide:nth-child(7) { transition-delay: 600ms; }
        .swiper-slide:nth-child(8) { transition-delay: 700ms; }

       

        

        .year-text {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, text-shadow;
        }

        .year-text.entering {
          opacity: 0;
          transform: scale(0.8) translateZ(0) translateY(20px);
        }

        .year-text.visible {
          opacity: 1;
          transform: scale(1) translateZ(0) translateY(0px);
        }

        .year-text.active {
          transform: scale(1.08) translateZ(0);
          text-shadow: 0 0 30px rgba(228, 237, 100, 0.35);
        }

        .timeline-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 1px;
          background: #d1d5db;
          z-index: 0;
          transform: translateZ(0);
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-line.fixed-mode {
          position: fixed;
          top: calc(70% + 2rem);
          width: 100vw;
          max-width: 1920px;
          left: 50%;
          transform: translateX(-50%) translateZ(0);
        }

        .timeline-line.relative-mode {
          top: calc(1.5rem + 10rem + 2rem);
        }

        /* Enhanced image transitions */
        .timeline-card img {
          transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-card.active img {
          transform: scale(1.03);
        }

        /* Smoother text transitions */
        .timeline-item p {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .timeline-item p.entering {
          opacity: 0;
          transform: translateY(15px);
        }

        .timeline-item p.visible {
          opacity: 1;
          transform: translateY(0px);
        }

        /* Enhanced badge animation */
        .inline-block {
          transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Reduce motion for users who prefer it */
        @media (prefers-reduced-motion: reduce) {
          * {
            transition-duration: 0.3s !important;
            animation-duration: 0.3s !important;
          }
          
          .timeline-card.active {
            transform: translateZ(0) scale(1.01);
          }
          
          .timeline-item.active {
            transform: translateZ(0) scale(1.005);
          }
          
          .year-text.active {
            transform: scale(1.02) translateZ(0);
          }

          .swiper-container.fixed.entering {
            transform: translate(-50%, -50%) translateZ(0) scale(0.98) translateY(10px);
            filter: none;
          }
        }

        @media (max-width: 1024px) {
          .timeline-line.fixed-mode {
            top: calc(70% + 1.5rem);
          }
          
          .timeline-line.relative-mode {
            top: calc(3rem + 8rem + 1.5rem);
          }

          .scroll-progress {
            width: 4px;
            height: 180px;
          }

          .header-container.fixed {
            top: 5%;
          }
        }

        @media (max-width: 768px) {
          .swiper-container.fixed {
            padding: 0 0.75rem;
          }

          .scroll-progress {
            right: 15px;
            width: 3px;
            height: 150px;
          }

          .header-container.fixed {
            top: 2%;
            padding: 0 0.75rem;
          }
        }

        * {
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .timeline-item,
        .timeline-card,
        .timeline-dot-positioned,
        .year-text,
        .swiper-slide {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      <section 
        ref={sectionRef}
        className="w-full overflow-hidden py-8 sm:py-12 lg:py-16 h-[250vh] bg-white relative min-h-screen"
        style={{ minHeight: '250vh' }}
      >
        {/* Enhanced Scroll Progress Indicator */}
        <div className="scroll-progress hidden lg:block">
          <div 
            className="scroll-progress-fill"
            style={{ height: `${scrollProgress * 100}%` }}
          ></div>
        </div>

        <div className="px-4 sm:px-6 lg:px-8 xl:max-w-[1920px] xl:mx-auto">
          {/* Header */}
          <div className="mx-auto pb-10 w-7xl">
            <div className="inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium mb-6">
              Our Timeline
            </div>
            <div className="w-full h-full">
              <h2 className="font-bold text-[50px] lg:text-[60px] xl:text-[50px] text-black">
                Journey Through
              </h2>
              <h2 className="font-bold text-[50px] lg:text-[60px] xl:text-[50px] text-black">
                Our Evolution
              </h2>
            </div>
          </div>

          {/* Main Timeline Container */}
          <div className="relative w-full">
            

            <div 
              ref={swiperContainerRef}
              className={`swiper-container ${
                isFixed 
                  ? `fixed transition-all duration-1000 ${
                      swiperVisible ? 'visible' : 'entering'
                    } ${exitTransition ? 'exiting' : ''}` 
                  : 'hidden'
              }`}
            >
              <div className="w-full overflow-hidden relative">
                <Swiper
                  onSwiper={(swiper: SwiperType) => {
                    swiperRef.current = swiper;
                  }}
                  className="timeline-swiper w-full"
                  slidesPerView={4.2}
                  slidesPerGroup={1}
                  spaceBetween={32}
                  loop={false}
                  centeredSlides={true}
                  speed={1000}
                  grabCursor={true}
                  touchRatio={1}
                  touchAngle={45}
                  simulateTouch={true}
                  allowTouchMove={true}
                  resistanceRatio={0.85}
                  longSwipesRatio={0.4}
                  longSwipesMs={300}
                  followFinger={true}
                  freeMode={false}
                  breakpoints={{
                    0: {
                      slidesPerView: 1.2,
                      spaceBetween: 16,
                      centeredSlides: true,
                    },
                    480: {
                      slidesPerView: 1.5,
                      spaceBetween: 16,
                      centeredSlides: true,
                    },
                    640: {
                      slidesPerView: 2.3,
                      spaceBetween: 20,
                      centeredSlides: true,
                    },
                    768: {
                      slidesPerView: 2.5,
                      spaceBetween: 24,
                      centeredSlides: true,
                    },
                    1024: {
                      slidesPerView: 3.2,
                      spaceBetween: 28,
                      centeredSlides: true,
                    },
                    1280: {
                      slidesPerView: 4.2,
                      spaceBetween: 32,
                      centeredSlides: true,
                    },
                  }}
                >
                  {timelineData.map((item: TimelineItem, index: number) => (
                    <SwiperSlide 
                      key={`${item.year}-${index}`} 
                      className={`w-full ${index === currentSlide ? 'active-slide' : ''}`}
                    >
                      <div className={`timeline-item w-full px-2 ${
                        index === currentSlide ? 'active' : ''
                      } ${
                        swiperVisible ? 'visible' : 'entering'
                      }`}>
                        {/* Year Display - positioned directly above image with clamp spacing */}
                        <div className="-mb-[clamp(5px,2vw,20px)]">
                          <span className={`year-text text-5xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#E4ED64] tracking-tight ${
                            index === currentSlide ? 'active' : ''
                          } ${
                            swiperVisible ? 'visible' : 'entering'
                          }`}>
                            {item.year}
                          </span>
                        </div>

                        {/* Building Image Container with increased bottom margin */}
                        <div className="relative mb-8 sm:mb-10 lg:mb-12 w-full max-w-xs mx-auto">
                          <div className={`timeline-card bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden ${
                            index === currentSlide ? 'active' : ''
                          } ${
                            swiperVisible ? 'visible' : 'entering'
                          }`}>
                            <img
                              src={item.image}
                              alt={`Building from ${item.year}`}
                              className="timeline-image w-full h-40 sm:h-48 md:h-52 lg:h-56 object-cover"
                              loading="lazy"
                              decoding="async"
                            />
                          </div>
                          {/* Floating effect shadow */}
                          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-3 sm:h-4 bg-black opacity-10 rounded-full blur-md"></div>
                        </div>

                        {/* Timeline Dot - Absolutely positioned to align with timeline line */}
                        <div className="relative flex justify-center">
                          <div
                            className={`timeline-dot-positioned absolute w-6 h-6 sm:w-8 sm:h-8 bg-[#E4ED64] rounded-full shadow-lg z-10 ${
                              index === currentSlide ? 'active' : ''
                            } ${
                              swiperVisible ? 'visible' : 'entering'
                            }`}
                            style={{
                              top: "0px",
                              transform: "translateX(-50%) translateY(-50%) translateZ(0)",
                            }}
                          ></div>
                        </div>

                        {/* Description with increased top spacing */}
                        <div className="text-center w-full max-w-xs mx-auto px-2 pt-8 lg:pt-10">
                          <p className={`text-gray-600 text-xs sm:text-sm leading-relaxed transition-all duration-1000 ${
                            index === currentSlide ? 'text-gray-800 font-medium' : ''
                          } ${
                            swiperVisible ? 'visible' : 'entering'
                          }`}>
                            {item.title}
                          </p>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* Spacer for scroll area */}
            <div className="h-[50vh]"></div>
          </div>

          {/* Mobile instruction */}
          <div className="text-center mt-20 lg:mt-28 lg:hidden">
            <p className="text-gray-500 text-base leading-relaxed">
              Scroll slowly to experience our timeline journey
            </p>
          </div>

          {/* Decorative elements - hidden on smaller screens */}
          <div className="hidden xl:block absolute top-20 right-10 w-2 h-2 bg-yellow-400 rounded-full opacity-60"></div>
          <div className="hidden xl:block absolute bottom-20 left-10 w-3 h-3 bg-yellow-300 rounded-full opacity-40"></div>
        </div>
      </section>
    </>
  );
};

export default TimelineSection;