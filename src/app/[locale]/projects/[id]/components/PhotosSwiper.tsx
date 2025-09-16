"use client";

import { useEffect, useState } from "react";
import { ProjectType } from "@/libs/types/types";
import { Autoplay, Navigation, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const PhotosSwiper = ({ projectData }: { projectData: ProjectType | null }) => {
  const [swiperReady, setSwiperReady] = useState(false);

  // Wait for images to load before initializing Swiper
  useEffect(() => {
    if (!projectData?.property_listing_images) return;
    const imgPromises = projectData.property_listing_images.map(
      (slide) =>
        new Promise((resolve) => {
          const img = new Image();
          img.src = slide.image;
          img.onload = resolve;
          img.onerror = resolve; // still resolve to avoid blocking
        })
    );
    Promise.all(imgPromises).then(() => setSwiperReady(true));
  }, [projectData]);

  if (!swiperReady) return null; // or loading placeholder

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Keyboard, Mousewheel]}
        spaceBetween={24}
        slidesPerView={1}
        // preloadImages={true}
        watchSlidesProgress
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".swiper-button-next-photos",
          prevEl: ".swiper-button-prev-photos",
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
            slidesPerView: 1,
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
          setTimeout(() => swiper.update(), 0);
          window.addEventListener("resize", () => swiper.update());
        }}
      >
        {projectData?.property_listing_images?.map(
          (slide: { id: number; image: string }, index: number) => (
            <SwiperSlide key={index} className="group imageSlide">
              <div className="w-full">
                <div className="media w-full h-[200px] sm:h-[300px] 2xl:h-[400px] rounded-3xl overflow-hidden">
                  <img
                    src={slide.image}
                    alt={`Slide ${index}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <button
        className="swiper-button-prev-photos absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black z-10 shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="Previous photo"
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
        className="swiper-button-next-photos absolute right-[2vw] sm:right-[3vw] md:right-[4vw] lg:right-[42%] xl:right-[35%] 2xl:right-[20%] top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-black z-50 shadow-lg transition-all duration-300 hover:scale-110 pointer-events-auto"
        aria-label="Next photo"
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

export default PhotosSwiper;
