"use client";

import { BannerTypes } from "@/libs/types/types";
import { useTranslations } from "next-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { AnimatedElement } from "../animations/AnimationType";

const Hero = ({ banners }: { banners?: BannerTypes[] }) => {

  const t = useTranslations();

  return (
    <div className="w-full relative h-[60vh] md:h-[80vh] lg:h-[110vh] ">
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
            {banners?.map((banner, index) => (

              <SwiperSlide key={index}>
                <div className="w-full h-full relative">
                  {/* Optimized image with multiple resolution support */}
                  <picture className="w-full h-full">
                    <source
                      media="(min-width: 1920px)"
                      srcSet={`${banner?.image || `/images/home/banner${index}-2k.webp`} 2048w, ${banner?.image || `/images/home/banner${index}-4k.webp`} 3840w`}
                      sizes="100vw"
                      type="image/webp"
                    />
                    <source
                      media="(min-width: 1200px)"
                      srcSet={`${banner?.image || `/images/home/banner${index}-desktop.webp`} 1920w`}
                      sizes="100vw"
                      type="image/webp"
                    />
                    <source
                      media="(min-width: 768px)"
                      srcSet={`${banner?.image || `/images/home/banner${index}-tablet.webp`} 1200w`}
                      sizes="100vw"
                      type="image/webp"
                    />
                    <source
                      media="(max-width: 767px)"
                      srcSet={`${banner?.image || `/images/home/banner${index}-mobile.webp`} 768w`}
                      sizes="100vw"
                      type="image/webp"
                    />
                    <img
                      src={banner?.image || `/images/home/banner${index}.png`}
                      className="w-full h-full object-cover object-center"
                      alt={`Hero banner ${index + 1}`}
                      loading={index === 0 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </picture>

                  {/* Optimized overlay with better gradient */}
                  <div className="absolute inset-0 pt-12 sm:pt-16 md:pt-20 flex items-center justify-center bg-gradient-to-b from-black/40 via-black/30 to-black/50">
                    <div className="flex flex-col hero justify-center items-center relative z-[1] px-4 sm:px-6 md:px-8 lg:px-5 w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] xl:max-w-[50%] text-center">
                      <AnimatedElement
                        type="slideUp"
                        duration={1}
                        className="w-full h-full"
                      >
                        <h1 className="justify-center capitalize text-white font-bold font-['Noto'] tracking-tight leading-[0.9] sm:leading-[0.95] md:leading-[1]
                          text-[28px] xs:text-[32px] sm:text-[40px] md:text-[50px] lg:text-[70px] xl:text-[80px] 2xl:text-[90px]
                          drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          {t("home.hero_title")} {t("home.hero_subtitle")}{" "}
                          {t("home.hero_description")}
                        </h1>
                      </AnimatedElement>

                      <AnimatedElement
                        type="slideUp"
                        delay={0.3}
                        duration={1}
                        className="w-full h-full"
                      >
                        <div className="desc mt-3 sm:mt-4 md:mt-5">
                          <p className="text-white font-bold font-['Lato'] capitalize tracking-wide opacity-90 
                            text-[14px] xs:text-[15px] sm:text-[16px] md:text-[17px] lg:text-[18px] xl:text-[19px] 2xl:text-[20px]
                            drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] max-w-[90%] mx-auto leading-relaxed">
                            {t("home.hero_description_part_one")}
                            {/* {t("home.hero_description_part_two")}
                            {t("home.hero_description_part_three")} */}
                          </p>
                        </div>
                      </AnimatedElement>

                      {/* Uncomment and optimize button if needed */}
                      {/* <AnimatedElement
                        type="slideUp"
                        delay={0.6}
                        duration={1}
                        className="w-full h-full"
                      >
                        <div className="flex items-center justify-center mt-6 sm:mt-8 md:mt-10">
                          <Link href={`/${locale}/contact`}>
                            <button
                              ref={buttonRef}
                              onMouseMove={handleMouseMove}
                              onMouseLeave={handleMouseLeave}
                              onMouseEnter={handleMouseEnter}
                              className="bg-[#dba426] border linear border-white/10 text-white rounded-full 
                                flex items-center justify-center font-[700] leading-[1] font-['Lucida Grande'] capitalize 
                                transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] 
                                hover:shadow-[0_0_20px_rgba(219,164,38,0.5)] hover:border-white/30 hover:scale-105
                                p-4 w-24 h-24 text-[12px] xs:p-5 xs:w-28 xs:h-28 xs:text-[14px]
                                sm:p-6 sm:w-32 sm:h-32 sm:text-[16px] 
                                lg:w-36 lg:h-36 lg:text-[18px] 
                                xl:w-40 xl:h-40 xl:text-[20px] 
                                2xl:text-[22px]"
                              style={{
                                transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(${scale})`,
                                opacity: 0.9,
                                willChange: "transform, opacity",
                              }}
                            >
                              <span>{t("home.hero_button")}</span>
                            </button>
                          </Link>
                        </div>
                      </AnimatedElement> */}
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

