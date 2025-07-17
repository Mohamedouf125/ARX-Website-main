"use client";

import React, { useRef } from "react";
import { NextPage } from "next";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";
import { AnimatedElement } from "../animations/AnimationType";

const WhoWeAre: NextPage = () => {
  const t = useTranslations();
  const statsRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white relative rounded-3xl mt-[-100px] z-10 w-full">
      <div className="w-full md:py-16 lg:w-[85%] mx-auto font-['lato']">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Mobile Layout: Stats overlaid on image */}
          <div className="block md:hidden">
            <div className="relative w-full">
              {/* Image - Mobile */}
              <AnimatedElement type="fadeIn" duration={1} className="w-full">
                <img
                  src="/who.jpg"
                  alt="Luxury Real Estate Building"
                  className="rounded-3xl object-cover w-full h-[700px]"
                />
              </AnimatedElement>

              {/* Overlay shapes */}
              <div className="cover z-10 absolute top-0 left-0 w-full h-full">
                <div
                  className="absolute top-[59px] left-[-1px] bg-white w-[30px] h-[30px] rounded-br-2xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
                  }}
                ></div>
                <div className="absolute top-0 left-0 bg-white w-[170px] h-[60px] rounded-br-3xl"></div>
                <div
                  className="absolute top-[-1px] left-[167px] bg-white w-[30px] h-[30px] rounded-br-4xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
                  }}
                ></div>
              </div>

              {/* Stats Grid Overlay - Mobile */}
              <div
                ref={statsRef}
                className="absolute inset-0 z-20 p-4 flex flex-col justify-end"
              >
                <div className="grid grid-cols-2 gap-3 items-center">
                  {[
                    {
                      title: t("who_we_are.total_years_of_experience"),
                      value: 20,
                      description: t("who_we_are.offices_worldwide"),
                      animation: "slideUp",
                      delay: 0,
                    },
                    {
                      title: t("who_we_are.units_sold"),
                      value: 3,
                      description: t("who_we_are.offices_worldwide"),
                      animation: "slideUp",
                      delay: 0.2,
                    },
                    {
                      title: t("who_we_are.total_constructions"),
                      value: 170,
                      description: t("who_we_are.offices_worldwide"),
                      animation: "slideUp",
                      delay: 0.4,
                    },
                    {
                      title: t("who_we_are.total_clients"),
                      value: 2,
                      description: t("who_we_are.offices_worldwide"),
                      animation: "slideUp",
                      delay: 0.6,
                    },
                  ].map((item, index) => (
                    <AnimatedElement
                      key={index}
                      type={item.animation as "fadeIn" | "slideUp"}
                      delay={item.delay}
                      duration={1}
                      className="w-full"
                    >
                      <div className="luxury-card duration-300 flex flex-col items-start justify-between bg-white/90 backdrop-blur-sm p-3 rounded-2xl h-[140px] transition-all duration-300 shadow-lg">
                        <h3 className="text-[10px] font-bold mb-1 border-b border-gray-300 pb-1 w-full uppercase leading-tight">
                          {item.title}
                        </h3>

                        <div className="item flex-1 flex flex-col justify-center">
                          <div className="flex items-center p-0">
                            <h1 className="text-[35px] font-[700] font-[Involve, Sans-serif] mb-[-10px] leading-none">
                              <CountUp
                                start={0}
                                end={item.value}
                                duration={4}
                                className="text-[35px]"
                                enableScrollSpy={true}
                                scrollSpyOnce={true}
                              />
                            </h1>
                            <span className="text-lg font-bold text-[#DBA426] text-[25px] mt-2">
                              +
                            </span>
                          </div>

                          <span className="text-[10px] leading-tight text-gray-600 mt-1">
                            {item.description}
                          </span>
                        </div>
                      </div>
                    </AnimatedElement>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout: Original side-by-side */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-8 h-full lg:h-[700px] overflow-hidden">
            {/* Left side with image */}
            <div className="relative justify-end flex w-full h-full">
              {/* shapes */}
              <div className="cover z-10 absolute top-0 left-0 w-full h-full">
                <div
                  className="absolute top-[59px] left-[-1px] bg-white w-[30px] h-[30px] rounded-br-2xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
                  }}
                ></div>
                <div className="absolute top-0 left-0 bg-white w-[170px] h-[60px] rounded-br-3xl"></div>
                <div
                  className="absolute top-[-1px] left-[167px] bg-white w-[30px] h-[30px] rounded-br-4xl rotate-[90deg]"
                  style={{
                    clipPath: ' path("M0 0 Q0,30 30,30 L 0 30 Z")',
                  }}
                ></div>
              </div>
              {/* end shapes */}

              <AnimatedElement
                type="fadeIn"
                duration={1}
                className="w-full h-full"
              >
                <img
                  src="/who.jpg"
                  alt="Luxury Real Estate Building"
                  className="rounded-3xl object-cover w-full h-[700px]"
                />
              </AnimatedElement>
            </div>

            {/* Right side with content */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              {[
                {
                  title: t("who_we_are.total_years_of_experience"),
                  value: 20,
                  description: t("who_we_are.offices_worldwide"),
                  animation: "slideUp",
                  delay: 0,
                },
                {
                  title: t("who_we_are.units_sold"),
                  value: 3,
                  description: t("who_we_are.offices_worldwide"),
                  animation: "slideUp",
                  delay: 0.2,
                },
                {
                  title: t("who_we_are.total_constructions"),
                  value: 170,
                  description: t("who_we_are.offices_worldwide"),
                  animation: "slideUp",
                  delay: 0.4,
                },
                {
                  title: t("who_we_are.total_clients"),
                  value: 2,
                  description: t("who_we_are.offices_worldwide"),
                  animation: "slideUp",
                  delay: 0.6,
                },
              ].map((item, index) => (
                <AnimatedElement
                  key={index}
                  type={item.animation as "fadeIn" | "slideUp"}
                  delay={item.delay}
                  duration={1}
                  className="w-full h-full"
                >
                  <div className="luxury-card duration-300 flex flex-col items-start justify-between bg-[#F5F5F5] p-4 lg:p-8 rounded-3xl md:h-[335px] transition-all duration-300">
                    <h3 className="text-[14px] font-bold mb-2 border-b border-gray-300 pb-2 w-full uppercase">
                      {item.title}
                    </h3>

                    <div className="item">
                      <div className="">
                        <div className="flex items-center p-0">
                          <h1 className="text-[70px] font-[700] font-[Involve, Sans-serif] mb-[-20px]">
                            <CountUp
                              start={0}
                              end={item.value}
                              duration={4}
                              className="text-[60px] md:text-[70px]"
                              enableScrollSpy={true}
                              scrollSpyOnce={true}
                            />
                          </h1>
                          <span className="text-lg font-bold text-[#DBA426] text-[40px] md:text-[50px] mt-5 md:mt-0">
                            +
                          </span>
                        </div>
                      </div>

                      <span className="text-[14px] xl:text-[20px] leading-[1] text-gray-600">
                        {item.description}
                      </span>
                    </div>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
