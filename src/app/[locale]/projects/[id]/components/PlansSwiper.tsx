"use client";

import { ProjectType } from "@/libs/types/types";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PlansSwiper = ({ projectData }: { projectData: ProjectType | null }) => {
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
    </div>
  );
};

export default PlansSwiper;
