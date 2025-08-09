"use client";
import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelopeOpen,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useTranslations, useLocale } from "next-intl";
import PageHero from "@/components/PageHero";
import { AnimatedElement } from "@/components/animations/AnimationType";

const inputStyle = "bg-gray-100 p-6 w-full focus:outline-none rounded-full";

const ContactPage = () => {
  const [phone, setPhone] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const t = useTranslations("contact");
  const locale = useLocale();

  const contactData = [
    {
      id: 1,
      icon: <FaEnvelopeOpen />,
      title: t("support_email"),
      btn: t("email_us"),
      description: "info@arxeg.com",
      link: "mailto:info@arxeg.com",
      animation: "slideUp",
    },
    {
      id: 2,
      icon: <FaPhoneAlt />,
      title: t("phone_number"),
      btn: t("call_us"),
      description: "16591",
      link: "tel:16591",
      animation: "slideUp",
      delay: 0.2,
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt />,
      title: t("location"),
      btn: t("visit_us"),
      description:
        "New Cairo - south 90 St- top 90 building\nNew Damietta - the 3rd district – 15th St",
      link: "https://maps.app.goo.gl/VYVirReCxBxe4zQC9",
      animation: "slideUp",
      delay: 0.4,
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contactData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + contactData.length) % contactData.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <PageHero
        title={t("get_in_touch")}
        description={t("new_description")}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title") },
        ]}
        backgroundImage="/header__contact__us.webp"
        height="medium"
        showDescription={false}
      />

      {/* Contact Form Section */}
      <div className="bg-white z-10 relative px-6 py-40 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="list">
            {/* Desktop Grid - unchanged */}
            <ul className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {contactData.map((item) => (
                <li key={item.id} className="">
                  <AnimatedElement
                    key={item.id}
                    type={
                      item.animation as "slideUp" | "slideLeft" | "slideRight"
                    }
                    duration={1}
                    delay={item.delay}
                    className="w-full h-full"
                  >
                    <div className="p-4 lg:p-6 xl:p-10 border border-gray-200 rounded-3xl space-y-8 flex flex-col justify-between h-full">
                      <div className="icon text-2xl">{item.icon}</div>
                      <div className="content">
                        <h3 className="text-[20px] lg:text-[25px] font-[600]">
                          {item.title}
                        </h3>
                        <p className="text-[16px] lg:text-[20px] font-[500] opacity-60 ">
                          {item.description}
                        </p>
                      </div>

                      <div className="w-full">
                        <a href={item.link} target="_blank">
                          <button className="bg-[#dba426] hover:bg-black w-full text-white px-6 py-4 rounded-full font-[600] hover:bg-opacity-90 transition-all duration-300">
                            {item.btn}
                          </button>
                        </a>
                      </div>
                    </div>
                  </AnimatedElement>
                </li>
              ))}
            </ul>

            {/* Mobile Slider */}
            <div className="md:hidden relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {contactData.map((item) => (
                    <div key={item.id} className="w-full flex-shrink-0 px-4">
                      <AnimatedElement
                        key={item.id}
                        type={
                          item.animation as "slideUp" | "slideLeft" | "slideRight"
                        }
                        duration={1}
                        delay={item.delay}
                        className="w-full h-full"
                      >
                        <div className="p-4 lg:p-6 xl:p-10 border border-gray-200 rounded-3xl space-y-8 flex flex-col justify-between h-full">
                          <div className="icon text-2xl">{item.icon}</div>
                          <div className="content">
                            <h3 className="text-[20px] lg:text-[25px] font-[600]">
                              {item.title}
                            </h3>
                            <p className="text-[16px] lg:text-[20px] font-[500] opacity-60 whitespace-pre-line">
                              {item.description}
                            </p>
                          </div>

                          <div className="w-full">
                            <a href={item.link} target="_blank" rel="noopener noreferrer">
                              <button className="bg-[#dba426] hover:bg-black w-full text-white px-6 py-4 rounded-full font-[600] hover:bg-opacity-90 transition-all duration-300">
                                {item.btn}
                              </button>
                            </a>
                          </div>
                        </div>
                      </AnimatedElement>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 z-10"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-4 h-4 text-gray-600" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 z-10"
                aria-label="Next slide"
              >
                <FaChevronRight className="w-4 h-4 text-gray-600" />
              </button>

              {/* Dot Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {contactData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'bg-[#dba426]' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {/* Left Side - Info */}
            <div className="space-y-6 mb-10 lg:mb-0">
              <h3 className="text-[30px] lg:text-[50px] font-[700]">
                {t("send_message")}
              </h3>
              <form className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
                  <div>
                    <input
                      id="name"
                      type="text"
                      placeholder={t("form.name")}
                      className={inputStyle}
                    />
                  </div>
                  <div>
                    <input
                      id="email"
                      type="email"
                      placeholder={t("form.email")}
                      className={inputStyle}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
                  <div>
                    <PhoneInput
                      international
                      defaultCountry="EG"
                      value={phone}
                      onChange={(value) => setPhone(value || "")}
                      id="phone"
                      placeholder={t("form.phone")}
                      className="w-full bg-gray-100 p-6 rounded-full"
                      inputClass="phone-input"
                    />
                  </div>
                  <div>
                    <select id="interest" className={inputStyle}>
                      <option>{t("form.subject_options.interested")}</option>
                      <option>{t("form.subject_options.commercial")}</option>
                      <option>{t("form.subject_options.housing")}</option>
                      <option>
                        {t("form.subject_options.administrative")}
                      </option>
                      <option>{t("form.subject_options.medical")}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <textarea
                    id="message"
                    placeholder={t("form.message")}
                    className={
                      "bg-gray-100 p-6 w-full focus:outline-none rounded-3xl"
                    }
                    rows={8}
                  ></textarea>
                </div>

                <div className="">
                  <button
                    type="submit"
                    className="group flex items-center bg-white justify-center p-2 pl-5 rounded-full border border-gray-300 hover:bg-black  hover:border-black transition-all duration-300"
                  >
                    <span className="inline-flex gap-2 items-center font-medium text-[#dba426] group-hover:text-white transition-all duration-300 rounded-full cursor-pointer">
                      <span className="text-[16px] font-[600] mx-2">
                        {t("form.send")}
                      </span>
                      <svg
                        className="w-10 h-10 bg-[#dba426]  rounded-full p-1 text-white group-hover:rotate-305 transition-all duration-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </form>
            </div>

            {/* Map */}
            <div className="w-full h-[300px] md:h-[100%] lg:h-[100%] xl:h-[700px] relative rounded-3xl">
              {/* Map image from import */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55292.51054158744!2d31.717864784673285!3d29.985697098329215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1457f37ff900ea15%3A0x79af3ad6eb5c0452!2sARX%20Development!5e0!3m2!1sen!2seg!4v1750696675452!5m2!1sen!2seg"
                width="100%"
                height="100%"
                className="rounded-3xl"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;