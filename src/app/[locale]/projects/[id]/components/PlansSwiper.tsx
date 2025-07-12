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
        slidesPerView={
          projectData?.property_floor_plans?.length &&
          projectData?.property_floor_plans?.length > 0
            ? 1.5
            : 1
        }
        autoplay={{
          delay: 8000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          991: {
            slidesPerView:
              projectData?.property_floor_plans?.length &&
              projectData?.property_floor_plans?.length > 0
                ? 1.5
                : 1,
          },
        }}
        loop
      >
        {projectData?.property_floor_plans?.length &&
        projectData?.property_floor_plans?.length > 0 ? (
          projectData?.property_floor_plans?.map(
            (
              slides: {
                id: number;
                image: string;
                title: string;
                description: string;
                created_at: string;
                updated_at: string;
              },
              index: number
            ) => (
              <SwiperSlide
                key={index}
                className="group imageSlide w-full border border-gray-200 p-3 lg:p-10 rounded-3xl h-full"
              >
                <div className="w-full">
                  <div className="swiper-slide-active media w-full h-[200px] lg:h-[300px] xl:h-[400px] rounded-xl overflow-hidden object-cover">
                    <img
                      src={slides.image}
                      alt={slides.image}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          )
        ) : (
          <SwiperSlide className="w-full bg-gray-200 rounded-xl flex items-center justify-center">
            <div className="w-full h-[600px] bg-gray-200 rounded-xl flex items-center justify-center">
              <div className="text-[45px] font-[600] text-center">
                No Floor Plans Available
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
    </div>
  );
};

export default PlansSwiper;
