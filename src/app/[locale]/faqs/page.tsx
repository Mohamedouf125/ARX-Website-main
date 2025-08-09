"use client";

import { useEffect, useState } from "react";
import { AxiosHeaders } from "axios";
import { getData } from "@/libs/axios/server";
import { useLocale, useTranslations } from "next-intl";
import { FQAType } from "@/libs/types/types";
import PageHero from "@/components/PageHero";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import Accordion from "@/components/Accordion";
import { AnimatedElement } from "@/components/animations/AnimationType";

export default function FAQ() {
  const locale = useLocale();
  const [faqs, setFaqs] = useState<FQAType[]>([]);
  const t = useTranslations("faqs");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getData(
          "faqs",
          {},
          new AxiosHeaders({
            lang: locale,
          })
        );
        setFaqs(response.data);
      } catch (error) {
        console.error("Error fetching FAQs:", error);
        // Fallback to static FAQs if API fails
      }
    };

    fetchData();
  }, [locale]);

  // Transform FAQ data to accordion format
  const accordionItems = faqs.map((faq, index) => ({
    id: `faq-${index}`,
    title: faq.request,
    description: faq.response,
  }));

  return (
    <div className="w-full">
      {/* Hero Section */}
      <PageHero
        title={t("title")}
        description={t("description")}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("title") },
        ]}
        backgroundImage="/header__f&q.webp"
        height="medium"
        showDescription={false}
      />

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24 bg-white rounded-3xl relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 pt-20 pb-20 gap-5 font-[sans-serif] max-w-7xl">
            {/* Left Section */}
            <div className="left-section col-span-1">
              <SmallHeadSpan>{t("find_your_answer")}</SmallHeadSpan>
            </div>
            {/* Right Section */}
            <div className="right-section col-span-2">
              <AnimatedElement
                type="slideUp"
                duration={1}
                className="w-full h-full"
              >
                <h2 className="font-bold text-[50px] lg:text-[60px] xl:text-[70px] text-black leading-[1.1em] ">
                  {t("read_most_frequent_questions")}
                </h2>
              </AnimatedElement>
            </div>
          </section>

          {/* FAQ Accordion */}
          <div className="mb-16 overflow-hidden">
            <Accordion items={accordionItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
