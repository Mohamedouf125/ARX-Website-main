"use client";

import { ProjectType } from "@/libs/types/types";
import { Autoplay, Navigation, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PlansSwiper = ({ projectData }: { projectData: ProjectType | null }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Keyboard, Mousewheel]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: '.swiper-button-next-plans',
          prevEl: '.swiper-button-prev-plans',
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        mousewheel={{
          forceToAxis: true,
          sensitivity: 1,
          releaseOnEdges: true,
        }}
        loop
        breakpoints={{
          0: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          991: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
        onSwiper={(swiper) => {
          swiper.el.addEventListener('mouseenter', () => {
            swiper.el.focus();
          });
        }}
      >
        {projectData?.property_floor_plans?.map(
          (slides: { id: number; image: string }, index: number) => (
            <SwiperSlide key={index} className="group imageSlide">
              <div className="w-full">
                <div className="media w-full rounded-3xl overflow-hidden">
                  <img
                    loading="lazy"
                    width={100}
                    height={50}
                    src={slides.image}
                    alt={slides.image}
                    className="object-contain w-full h-auto"
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="swiper-button-prev-plans absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black z-10 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      
      <button
        className="swiper-button-next-plans absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black z-10 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
};

export default PlansSwiper;