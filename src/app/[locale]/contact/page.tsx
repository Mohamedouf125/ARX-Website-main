"use client";
import React, { useState, useEffect } from "react";
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
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";

const inputStyle = "bg-gray-100 p-6 w-full focus:outline-none rounded-full";

interface ContactBanner {
  image: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const ContactPage = () => {
  const [phone, setPhone] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [contactBanner, setContactBanner] = useState<ContactBanner | null>(
    null
  );
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations("contact");
  const locale = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          "contact-us-banner",
          {},
          new AxiosHeaders({ lang: locale })
        );

        const data = response?.data;
        setContactBanner(data || null);
      } catch (error) {
        console.error("Error fetching contact banner:", error);
        setContactBanner(null); // fallback to prevent errors
      }
    };

    fetchData();
  }, [locale]);
  const getEmbedUrl = (locationLink?: string): string => {
    if (!locationLink) {
      return ""; // Return empty string as fallback
    }

    // Extract coordinates from the Google Maps URL
    const match = locationLink.match(/@(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (match) {
      const [, lat, lng] = match;
      return `https://maps.google.com/maps?q=${lat},${lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
    }
    return ""; // Return empty string if no match found
  };
  // Contact data configuration
  const contactData = [
    {
      id: 1,
      icon: <FaEnvelopeOpen />,
      title: t("support_email"),
      btn: t("email_us"),
      description: "info@arxeg.com",
      link: "mailto:info@arxeg.com",
      animation: "slideUp" as const,
    },
    {
      id: 2,
      icon: <FaPhoneAlt />,
      title: t("phone_number"),
      btn: t("call_us"),
      description: "16591",
      link: "tel:16591",
      animation: "slideUp" as const,
      delay: 0.2,
    },
    {
      id: 3,
      icon: <FaMapMarkerAlt />,
      title: t("location"),
      btn: t("visit_us"),
      description:t("description"),
      link: "https://maps.google.com/?q=31.438272,31.664551",
      animation: "slideUp" as const,
      delay: 0.4,
    },
  ];

  // Subject options configuration
  const subjectOptions = [
    { value: "", label: t("form.subject_options.interested") },
    { value: "commercial", label: t("form.subject_options.commercial") },
    { value: "housing", label: t("form.subject_options.housing") },
    {
      value: "administrative",
      label: t("form.subject_options.administrative"),
    },
    { value: "medical", label: t("form.subject_options.medical") },
  ];

  // Slider navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % contactData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + contactData.length) % contactData.length
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Form handling functions
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string | undefined) => {
    const phoneValue = value || "";
    setPhone(phoneValue);
    setFormData((prev) => ({
      ...prev,
      phone: phoneValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Add your form submission logic here
      console.log("Form submitted:", { ...formData, phone });

      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setPhone("");

      // Show success message (you can implement toast notifications here)
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Error sending message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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
        backgroundImage={contactBanner?.image}
        height="medium"
        showDescription={false}
      />

      {/* Contact Form Section */}
      <div className="bg-white z-10 relative px-6 py-40 rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <div className="list">
            {/* Desktop Grid */}
            <ul className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {contactData.map((item) => (
                <li key={item.id}>
                  <AnimatedElement
                    type={item.animation}
                    duration={1}
                    delay={item.delay}
                    className="w-full h-full"
                  >
                    <div className="p-4 lg:p-6 xl:p-10 border border-gray-200 rounded-3xl space-y-8 flex flex-col justify-between h-full">
                      <div className="icon text-2xl text-[#dba426]">
                        {item.icon}
                      </div>
                      <div className="content">
                        <h3 className="text-[20px] lg:text-[25px] font-[600] mb-2">
                          {item.title}
                        </h3>
                        <p className="text-[16px] lg:text-[20px] font-[500] opacity-60 whitespace-pre-line">
                          {item.description}
                        </p>
                      </div>

                      <div className="w-full">
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="bg-[#dba426] hover:bg-black w-full text-white px-6 py-4 rounded-full font-[600] transition-all duration-300">
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
                        type={item.animation}
                        duration={1}
                        delay={item.delay}
                        className="w-full h-full"
                      >
                        <div className="p-4 lg:p-6 xl:p-10 border border-gray-200 rounded-3xl space-y-8 flex flex-col justify-between h-full min-h-[300px]">
                          <div className="icon text-2xl text-[#dba426]">
                            {item.icon}
                          </div>
                          <div className="content mb-14">
                            <h3 className="text-[20px] lg:text-[25px] font-[600] mb-2">
                              {item.title}
                            </h3>
                            <p className="text-[16px] lg:text-[20px] font-[500] opacity-60 whitespace-pre-line">
                              {item.description}
                            </p>
                          </div>

                          <div className="w-full">
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="bg-[#dba426] hover:bg-black w-full text-white px-6 py-4 rounded-full font-[600] transition-all duration-300">
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
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 z-50"
                aria-label="Previous slide"
              >
                <FaChevronLeft className="w-4 h-4 text-gray-600" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white border border-gray-200 rounded-full p-2 shadow-lg hover:bg-gray-50 transition-all duration-200 z-50"
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
                        ? "bg-[#dba426]"
                        : "bg-gray-300 hover:bg-gray-400"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Form and Map Section */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 mt-20">
            {/* Left Side - Contact Form */}
            <div className="space-y-6 mb-10 lg:mb-0">
              <h3 className="text-[30px] lg:text-[50px] font-[700]">
                {t("send_message")}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
                  <div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t("form.name")}
                      className={inputStyle}
                      required
                    />
                  </div>
                  <div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t("form.email")}
                      className={inputStyle}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
                  <div>
                    <PhoneInput
                      international
                      defaultCountry="EG"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder={t("form.phone")}
                      className="w-full bg-gray-100 p-6 rounded-full [&_.PhoneInputInput]:bg-transparent [&_.PhoneInputInput]:border-0 [&_.PhoneInputInput]:outline-0 [&_.PhoneInputInput]:text-base"
                    />
                  </div>
                  <div className="relative">
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={`bg-gray-100 p-6 w-full focus:outline-none rounded-full appearance-none cursor-pointer ${
                        locale === "ar"
                          ? "pl-12 pr-6 text-right" // RTL: padding-left for arrow, text-right
                          : "pr-12 pl-6 text-left" // LTR: padding-right for arrow, text-left
                      }`}
                      dir={locale === "ar" ? "rtl" : "ltr"}
                      required
                    >
                      {subjectOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>

                    {/* Custom dropdown arrow with RTL/LTR positioning */}
                    <div
                      className={`absolute inset-y-0 flex items-center pointer-events-none ${
                        locale === "ar"
                          ? "left-4" // RTL: arrow on the left side
                          : "right-4" // LTR: arrow on the right side
                      }`}
                    >
                      <svg
                        className="w-5 h-5 text-gray-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("form.message")}
                    className="bg-gray-100 p-6 w-full focus:outline-none rounded-3xl resize-none"
                    rows={8}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex items-center bg-white justify-center p-2 pl-5 rounded-full border border-gray-300 hover:bg-black hover:border-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="inline-flex gap-2 items-center font-medium text-[#dba426] group-hover:text-white transition-all duration-300 rounded-full cursor-pointer">
                      <span className="text-[16px] font-[600] mx-2">
                        {isSubmitting ? "Sending..." : t("form.send")}
                      </span>
                      <svg
                        className="w-10 h-10 bg-[#dba426] rounded-full p-1 text-white group-hover:rotate-[360deg] transition-all duration-300"
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

            {/* Right Side - Map */}
            <div className="w-full h-[300px] md:h-[100%] lg:h-[100%] xl:h-[700px] relative rounded-3xl">
              <iframe
                src={getEmbedUrl(
                  "https://www.google.com/maps/place/31%C2%B026'17.8%22N+31%C2%B039'52.4%22E/@31.4382778,31.6645556,17z/data=!3m1!4b1!4m4!3m3!8m2!3d31.4382778!4d31.6645556?entry=ttu&g_ep=EgoyMDI1MDgzMC4wIKXMDSoASAFQAw%3D%3D"
                )}
                width="100%"
                height="100%"
                className="rounded-3xl border-0"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                title="ARX Development Location"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
