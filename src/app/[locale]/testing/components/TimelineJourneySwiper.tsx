"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import { AnimatedElement } from "@/components/animations/AnimationType";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import { useTranslations } from "next-intl";
const TimelineSection = () => {
  const timelineData = [
    {
      year: "1983",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image:
        "https://img.freepik.com/premium-psd/luxury-modern-house-isolated-transparent-background_542466-7862.jpg?w=1480",
    },
    {
      year: "1996",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    },
    {
      year: "2005",
      title:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    },
    {
      year: "2010",
      title:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
      year: "2014",
      title:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
    },
    {
      year: "2018",
      title:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    },
    {
      year: "2021",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop",
    },
    {
      year: "2024",
      title:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    },
    {
      year: "1983",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
      year: "1996",
      title:
        "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa.",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop",
    },
    {
      year: "2005",
      title:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti.",
      image:
        "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop",
    },
    {
      year: "2010",
      title:
        "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    },
    {
      year: "2014",
      title:
        "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae.",
      image:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&h=600&fit=crop",
    },
    {
      year: "2018",
      title:
        "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
    },
    {
      year: "2021",
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      image:
        "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&h=600&fit=crop",
    },
    {
      year: "2024",
      title:
        "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&h=600&fit=crop",
    },
  ];
  const t = useTranslations("test");
  return (
    <>
      <style jsx>{`
        .timeline-swiper {
          overflow: hidden;
          width: 100%;
        }

        body {
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        /* Hardware acceleration for smooth performance */
        .timeline-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Optimize image rendering */
        .timeline-image {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        /* Smooth transitions with hardware acceleration */
        .timeline-card {
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }

        .timeline-card:hover {
          transform: translateZ(0) scale(1.05);
        }

        /* Ensure timeline dots align perfectly with the horizontal line */
        .timeline-dot-positioned {
          position: absolute;
          left: 50%;
          transform: translateX(-50%) translateZ(0);
          z-index: 10;
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Optimize swiper performance */
        .swiper {
          transform: translateZ(0);
          will-change: transform;
        }

        .swiper-slide {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      <section className="w-full overflow-hidden py-8 sm:py-12 lg:py-16 min-h-screen bg-white">
        <div className=" px-4 sm:px-6 lg:px-8 xl:max-w-[1920px] xl:mx-auto">
          {/* Header */}
          <div className=" mx-auto pb-10 w-7xl">
            <SmallHeadSpan>{t("vision_title")}</SmallHeadSpan>
            <AnimatedElement
              type="slideUp"
              duration={1}
              className="w-full h-full"
            >
              <h2 className="font-bold text-[50px] lg:text-[60px] xl:text-[50px] text-black">
                {t("description")}
              </h2>
              <h2 className="font-bold text-[50px] lg:text-[60px] xl:text-[50px] text-black">
                {t("description2")}
              </h2>
            </AnimatedElement>
          </div>

          {/* Timeline Container */}
          <div className="relative w-full overflow-hidden">
            {/* Timeline Line - Responsive positioning adjusted for clamp spacing */}
            <div
              className="hidden lg:block absolute left-0 right-0 h-px bg-gray-300 z-0"
              style={{
                top: "calc(1.5rem + 14rem + 4rem)",
                transform: "translateZ(0)",
              }}
            ></div>
            {/* Timeline Line for small screens with clamp spacing */}
            <div
              className="block lg:hidden absolute left-0 right-0 h-px bg-gray-300 z-0"
              style={{
                top: "calc(3rem + 10rem + 1.5rem)",
                transform: "translateZ(0)",
              }}
            ></div>

            {/* Swiper Container */}
            <div className="w-full overflow-hidden relative">
              <Swiper
                modules={[Autoplay]}
                className="timeline-swiper w-full"
                slidesPerView={4.2}
                slidesPerGroup={1}
                spaceBetween={32}
                loop={false}
                centeredSlides={true}
                speed={1000}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                grabCursor={true}
                touchRatio={1}
                touchAngle={45}
                simulateTouch={true}
                allowTouchMove={true}
                resistanceRatio={0.85}
                breakpoints={{
                  0: {
                    slidesPerView: 1.2,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                    centeredSlides: true,
                  },
                  480: {
                    slidesPerView: 1.5,
                    slidesPerGroup: 1,
                    spaceBetween: 16,
                    centeredSlides: true,
                  },
                  640: {
                    slidesPerView: 2.3,
                    slidesPerGroup: 1,
                    spaceBetween: 20,
                    centeredSlides: true,
                  },
                  768: {
                    slidesPerView: 2.5,
                    slidesPerGroup: 1,
                    spaceBetween: 24,
                    centeredSlides: true,
                  },
                  1024: {
                    slidesPerView: 3.2,
                    slidesPerGroup: 1,
                    spaceBetween: 28,
                    centeredSlides: true,
                  },
                  1280: {
                    slidesPerView: 4.2,
                    slidesPerGroup: 1,
                    spaceBetween: 32,
                    centeredSlides: true,
                  },
                }}
              >
                {timelineData.map((item, index) => (
                  <SwiperSlide key={`${item.year}-${index}`} className="w-full">
                    <div className="timeline-item w-full px-2">
                      {/* Year - positioned directly above image with clamp spacing */}
                      <div className="-mb-[clamp(5px,2vw,20px)]">
                        <span className="text-5xl sm:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#E4ED64] tracking-tight">
                          {item.year}
                        </span>
                      </div>

                      {/* Building Image Container with increased bottom margin */}
                      <div className="relative mb-8 sm:mb-10 lg:mb-12 w-full max-w-xs mx-auto">
                        <div className="timeline-card bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden">
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
                          className="timeline-dot-positioned absolute w-6 h-6 sm:w-8 sm:h-8 bg-[#E4ED64] rounded-full shadow-lg z-10"
                          style={{
                            top: "0px",
                            transform:
                              "translateX(-50%) translateY(-50%) translateZ(0)",
                          }}
                        ></div>
                      </div>

                      {/* Description with increased top spacing */}
                      <div className="text-center w-full max-w-xs mx-auto px-2 pt-8 lg:pt-10">
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
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
