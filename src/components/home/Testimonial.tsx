// pages/ProjectAndBlog.tsx
"use client";

import React from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TestimonialType } from "@/libs/types/types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { AnimatedElement } from "../animations/AnimationType";

const Testimonial = ({
  testimonials,
  bannerCircle,
}: {
  testimonials: TestimonialType[];
  bannerCircle: string;
}) => {
  return (
    <div className="space-y-24 px-4 py-40 bg-[#f8f5f0] relative mt-30 rounded-b-3xl z-10 w-full">
      {/* Circular Spinner with Text and Center Elements */}
      <div className="">
        {/* Circular Text Path - Spinning */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <svg
            viewBox="0 0 300 300"
            height="180"
            width="180"
            className="animate-spin-slow duration-[8000ms]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <path
                d="M150,150 m-125,0 a125,125 0 1,1 250,0 a125,125 0 1,1 -250,0"
                id="text-circle-path"
              />
            </defs>
            <text className="text-sm font-medium fill-[#DBA426]">
              <textPath
                href="#text-circle-path"
                startOffset="0%"
                className="text-xl tracking-wider uppercase font-bold"
              >
                what people says · what people says · what people says · what
                people says ·
              </textPath>
            </text>
          </svg>
        </div>

        {/* Center Image */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img
              loading="lazy"
              decoding="async"
              width="128"
              height="128"
              src={bannerCircle}
              className="w-full h-full object-cover"
              alt="Testimonial"
            />
          </div>
        </div>

        {/* Quote Icons - Top and Bottom */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          {/* Top Quote Icon */}
          <div className="w-12 h-12 bg-[#DBA426] rounded-full flex items-center justify-center shadow-lg">
            <svg
              className="w-6 h-6 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Decorative Shape */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="320"
        height="104"
        viewBox="0 0 320 104"
        fill="none"
        className="absolute top-0 left-1/2 -translate-x-1/2"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H320C290.545 0 267.772 24.6753 253.628 49.8666C235.516 82.1247 200.378 104 160 104C119.622 104 84.4835 82.1247 66.3718 49.8666C52.228 24.6753 29.4552 0 0 0Z"
          fill="white"
        ></path>
      </svg>

      {/* ---------------------------- */}
      {/* Testimonials Section */}
      {/* ---------------------------- */}
      <section className="px-4 relative max-w-5xl mx-auto">
        {/* <h2 className="text-center font-[Cinzel] text-3xl font-black mb-6">
          {t("trusted_by_clients")}
        </h2> */}
        <div className="max-w-xl mx-auto">
          {/* Left Navigation Button */}
          <button className="testimonial-prev-button text-black absolute left-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#035B8D] transition-all duration-300 rounded-full p-4 z-10">
            <svg
              className="w-3 h-3 text-black"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.70711 2.25545C8.09763 1.86492 8.09763 1.23176 7.70711 0.841233C7.31658 0.450709 6.68342 0.450709 6.29289 0.841233L0.292893 6.84123C-0.0976311 7.23176 -0.0976311 7.86492 0.292893 8.25545L6.29289 14.2554C6.68342 14.646 7.31658 14.646 7.70711 14.2554C8.09763 13.8649 8.09763 13.2318 7.70711 12.8412L3.41421 8.54834L17 8.54834C17.5523 8.54834 18 8.10063 18 7.54834C18 6.99606 17.5523 6.54834 17 6.54834L3.41421 6.54834L7.70711 2.25545Z"
                fill="black"
              />
            </svg>
          </button>

          {/* Right Navigation Button */}
          <button className="testimonial-next-button absolute right-0 top-1/2 transform -translate-y-1/2 bg-white hover:bg-[#035B8D] rounded-full transition-all duration-300 p-4 z-10">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-white"
              viewBox="0 0 20 20"
              fill="black"
            >
              <path
                fillRule="evenodd"
                d="M12.707 15.707a1 1 0 01-1.414-1.414L14.586 11H5a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          <AnimatedElement
            type="slideUp"
            duration={1}
            className="w-full h-full"
          >
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: ".testimonial-prev-button",
                nextEl: ".testimonial-next-button",
              }}
              className="testimonial-swiper w-full"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={testimonial.id || index}>
                  <div className="text-center">
                    <p
                      className="italic text-gray-700 text-4xl mb-20"
                      dangerouslySetInnerHTML={{
                        __html: testimonial.description,
                      }}
                    />

                    <div className="flex items-center justify-center space-x-3">
                      {testimonial.image && (
                        <div className="w-12 h-12 rounded-full overflow-hidden">
                          <img
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-semibold text-lg">
                          {testimonial.name}
                        </p>
                        <p className="text-sm w-full border-t-1 border-[#DBA426] text-gray-500 pt-1">
                          {testimonial.name}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
};

export default Testimonial;
