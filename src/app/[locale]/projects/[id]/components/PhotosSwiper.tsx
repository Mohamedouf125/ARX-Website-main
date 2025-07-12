"use client";

import { ProjectType } from "@/libs/types/types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PhotosSwiper = ({ projectData }: { projectData: ProjectType | null }) => {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
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
      >
        {projectData?.property_listing_images?.map(
          (slides: { id: number; image: string }, index: number) => (
            <SwiperSlide key={index} className="group imageSlide">
              <div className="w-full">
                <div className="swiper-slide-active media w-full h-[200px] sm:h-[300px] 2xl:h-[400px] rounded-3xl overflow-hidden">
                  <img
                    src={slides.image}
                    alt={slides.image}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>
            </SwiperSlide>
          )
        )}
      </Swiper>
    </div>
  );
};

export default PhotosSwiper;
