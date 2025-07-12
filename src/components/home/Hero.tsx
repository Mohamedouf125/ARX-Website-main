"use client";

import { useState, useRef, useEffect } from "react";
import { ProjectType } from "@/libs/types/types";
import { useLocale, useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";
import { AnimatedElement } from "../animations/AnimationType";

const Hero = ({ projects }: { projects: ProjectType[] }) => {
  const t = useTranslations();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const locale = useLocale();

  useEffect(() => {
    if (!isHovered) {
      // Smoothly return to original position when not hovered
      const returnAnimation = () => {
        setPosition((prev) => {
          const dx = (0 - prev.x) * 0.1;
          const dy = (0 - prev.y) * 0.1;

          if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
            return {
              x: prev.x + dx,
              y: prev.y + dy,
            };
          }
          return { x: 0, y: 0 };
        });

        if (Math.abs(position.x) > 0.1 || Math.abs(position.y) > 0.1) {
          requestAnimationFrame(returnAnimation);
        }
      };

      returnAnimation();
      setScale(1);
      return;
    }

    const animate = () => {
      setPosition((prev) => {
        // Dynamic easing based on distance
        const distance = Math.sqrt(
          Math.pow(targetPosition.x - prev.x, 2) +
            Math.pow(targetPosition.y - prev.y, 2)
        );
        const easingFactor = Math.min(0.3, 0.05 + distance * 0.005);

        return {
          x: prev.x + (targetPosition.x - prev.x) * easingFactor,
          y: prev.y + (targetPosition.y - prev.y) * easingFactor,
        };
      });

      requestAnimationFrame(animate);
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered, targetPosition]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    // More pronounced movement effect
    const x = (e.clientX - rect.left - rect.width / 2) * 0.6;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.6;

    setTargetPosition({ x, y });
    // Subtle scale and opacity changes
    setScale(1.05);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTargetPosition({ x: 0, y: 0 });
    setScale(1);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setScale(1.03);
  };

  return (
    <div className="w-full relative h-[80vh] lg:h-[110vh] ">
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full flex justify-between items-center">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            navigation={false}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            className="w-full absolute top-0 left-0 right-0 bottom-0 z-0 h-full"
          >
            {[0, 1, 2].map((index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full relative">
                  <img
                    src={
                      projects[index]?.hero_image ||
                      `/images/home/banner${index}.png`
                    }
                    className="w-full h-full object-cover"
                    alt="banner"
                  />

                  <div className="absolute inset-0 pt-20 flex items-center justify-center bg-black/20">
                    <div className="flex flex-col hero justify-center items-center relative z-[1] px-5 w-[100%] lg:w-[50%] text-center">
                      <AnimatedElement
                        type="slideUp"
                        duration={1}
                        className="w-full h-full"
                      >
                        <div className="justify-center capitalize text-white text-[40px] lg:text-[90px] font-bold font-['Lucida Grande'] tracking-tight leading-[1]">
                          {t("home.hero_title")} {t("home.hero_subtitle")}{" "}
                          {t("home.hero_description")}
                        </div>
                      </AnimatedElement>

                      <AnimatedElement
                        type="slideUp"
                        delay={0.3}
                        duration={1}
                        className="w-full h-full"
                      >
                        <div className="desc mt-5">
                          <span className="text-white font-bold font-['Lato'] capitalize tracking-wide opacity-70 text-[16px] md:text-[18px] lg:text-[20px]">
                            {t("home.hero_description_part_one")}
                            {t("home.hero_description_part_two")}
                            {t("home.hero_description_part_three")}
                          </span>
                        </div>
                      </AnimatedElement>

                      <AnimatedElement
                        type="slideUp"
                        delay={0.6}
                        duration={1}
                        className="w-full h-full"
                      >
                        <div className="flex items-center justify-center mt-10">
                          <Link href={`/${locale}/contact`}>
                            <button
                              ref={buttonRef}
                              onMouseMove={handleMouseMove}
                              onMouseLeave={handleMouseLeave}
                              onMouseEnter={handleMouseEnter}
                              className="bg-[#dba426] border linear border-white/10 text-white p-6 rounded-full w-32 h-32 lg:w-40 lg:h-40 flex items-center justify-center font-[700] leading-[1] font-['Lucida Grande'] capitalize text-[16px] lg:text-[22px] transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] hover:shadow-[0_0_20px_rgba(1,91,141,0.5)] hover:border-white/30"
                              style={{
                                transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
                                opacity: 0.8, // غير القيمة هنا (كانت opacity)
                                willChange: "transform, opacity",
                              }}
                            >
                              <span>{t("home.hero_button")}</span>
                            </button>
                          </Link>
                        </div>
                      </AnimatedElement>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Hero;
