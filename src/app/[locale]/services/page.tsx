import { AnimatedElement } from "@/components/animations/AnimationType";
import PageHero from "@/components/PageHero";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React from "react";

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations("our_features");

  const services = [
    {
      id: 1,
      title: t("Residential.title"),
      description: t("Residential.description"),
      image: "/h2_tab-icon1.jpg",
    },
    {
      id: 2,
      title: t("Medical.title"),
      description: t("Medical.description"),
      image: "/h2_tab-icon2.jpg",
      reverse: true,
    },
    {
      id: 3,
      title: t("Administrative.title"),
      description: t("Administrative.description"),
      image: "/h2_tab-icon3.jpg",
    },
    {
      id: 4,
      title: t("Commercial.title"),
      description: t("Commercial.description"),
      image: "/h2_tab-icon4.jpg",
      reverse: true,
    },
  ];

  return (
    <div>
      <PageHero
        title={t("page_title")}
        hideDescription={true}
        breadcrumbs={[
          { label: locale === "en" ? "Home" : "الرئيسية", href: "/" },
          { label: t("span") },
        ]}
      />

      <section className="bg-white py-30 px-6 relative z-10 overflow-hidden rounded-3xl">
        <div className="max-w-7xl mx-auto">
          <AnimatedElement
            type="slideLeft"
            duration={1}
            className="w-full h-full"
          >
            <h2 className="text-[25px] md:text-[30px] lg:text-[35px] font-bold mb-12 lg:w-[70%] leading-none">
              {t("description")}
            </h2>
          </AnimatedElement>

        <AnimatedElement
            type="slideUp"
            duration={1}
            className="w-full h-full"
          >
          <div className="grid grid-cols-1 gap-10">
            {services.map((service) => (
              <div
                key={service.id}
                className={`group flex flex-col md:flex-row items-center gap-10 border border-gray-200 rounded-3xl p-3 hover:bg-[#035B8D] hover:text-white transition-all duration-400 ${
                  service.reverse ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="left-section w-full md:w-[50%] ">
                  <div className="overflow-hidden rounded-2xl w-[100%] h-[300px] sm:h-[500px] md:h-[300px] lg:h-[500px]">
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={700}
                      height={700}
                      className="w-full h-full object-cover rounded-2xl scale-125 group-hover:translate-x-[50px] transition-all duration-400"
                    />
                  </div>
                </div>
                <div className="right-section md:w-[50%] pb-8 px-4 md:px-6 lg:px-16">
                  <h3 className="text-[35px] lg:text-[55px] font-bold mb-6 border-b border-gray-200 pb-2">
                    {service.title}
                  </h3>
                  <p className="text-[16px] lg:text-[18px] text-gray-700 group-hover:text-white transition-all duration-400">
                    {service.description}
                  </p>
                </div>
                </div>
              ))}
          </div>
            </AnimatedElement>
        </div>
      </section>
    </div>
  );
}

export default Page;
