"use client";
import React, { useRef, useEffect, useState } from "react";
import "../../../last.css";
import { ProjectType } from "@/libs/types/types";
import { useLocale } from "next-intl";
import { useTranslations } from "use-intl";
import { AnimatedElement } from "@/components/animations/AnimationType";
import SmallHeadSpan from "@/components/SharedComponent/SmallHeadSpan";
import { PDFPopup } from "@/components/PDFPopup";

export const LayaredProjectCards = ({
  projects,
}: {
  projects: ProjectType[];
}) => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const locale = useLocale();
  const t = useTranslations("home");
  
  // PDF Popup state
  const [isPDFPopupOpen, setIsPDFPopupOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const cardsContainer = cardsContainerRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    if (!cardsContainer || cards.length === 0) return;

    // Set CSS custom properties
    cardsContainer.style.setProperty("--cards-count", cards.length.toString());
    cardsContainer.style.setProperty(
      "--card-height",
      `${cards[0].clientHeight}px`
    );

    // Set up scroll observer for each card
    const observers: IntersectionObserver[] = [];

    cards.forEach((card, index) => {
      const offsetTop = 130 + index * 0;
      card.style.paddingTop = `${offsetTop}px`;

      if (index === cards.length - 1) return;

      const toScale = 1 - (cards.length - 1 - index) * 0.1;
      const toOpacity = 1 - (cards.length - 1 - index) * 0.2;
      const cardInner = card.querySelector(".card__inner") as HTMLElement;

      if (!cardInner) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const rect = entry.boundingClientRect;
              const percentageY = Math.max(
                0,
                Math.min(
                  1,
                  (window.innerHeight - rect.top) /
                    (window.innerHeight + rect.height)
                )
              );

              cardInner.style.scale = String(1 - (1 - toScale) * percentageY);
              card.style.opacity = String(1 - (1 - toOpacity) * percentageY);
              cardInner.style.filter = `brightness(${
                1 - (1 - 0.6) * percentageY
              })`;
            }
          });
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: `-${offsetTop}px 0px -${
            window.innerHeight - cards[0].clientHeight
          }px 0px`,
        }
      );

      observer.observe(card);
      observers.push(observer);
    });

    // Cleanup observers on unmount
    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  // Handle project card click to open PDF popup
  const handleProjectClick = (project: ProjectType) => {
    setSelectedProject(project);
    setIsPDFPopupOpen(true);
  };

  // Handle popup close
  const handleClosePopup = () => {
    setIsPDFPopupOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="home_projects py-20 bg-[#f6f3ec]">
      {/* ---------------------------- */}
      {/* Projects Banner Section */}
      {/* ---------------------------- */}
      <section className="max-w-6xl mx-auto px-4">
        <div className=" px-4 relative overflow-hidden mb-[-60px] z-10">
          <div className="flex flex-col justify-center items-center">
            <SmallHeadSpan>{t("selected_projects")}</SmallHeadSpan>

            <div className="max-w-2xl text-center">
              <AnimatedElement
                type="slideUp"
                duration={1}
                className="w-full h-full"
              >
                <span className="text-2xl sm:text-3xl lg:text-5xl uppercase font-extrabold text-gray-900">
                  {t("our_projects_description")}
                </span>
              </AnimatedElement>
            </div>

            <div className="mt-4 items-center justify-center w-fit flex gap-1 text-[#DBA426] font-medium">
              {t("see_all_projects")}{" "}
              <svg
                className={`${locale === "ar" ? "mirror" : ""}`}
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.50008 3.21484L7.56008 4.15484L11.2801 7.88151H3.16675V9.21484H11.2801L7.56008 12.9415L8.50008 13.8815L13.8334 8.54818L8.50008 3.21484Z"
                  fill="#DBA426"
                />
              </svg>
            </div>
          </div>
        </div>

        <section className="w-full h-full relative bg-[#f8f6f0]">
          <div className="gap-14 grid grid-cols-1" ref={cardsContainerRef}>
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="sticky top-0 h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] w-full rounded-3xl cursor-pointer"
                data-index={index}
                style={{ paddingTop: `${130 + index * 0}px` }}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                onClick={() => handleProjectClick(project)}
              >
                <div className="relative rounded-3xl overflow-hidden w-full h-full">
                  {/* Background Image */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-1000 ease-in-out"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 bg-opacity-40"></div>
                  </div>

                  {/* Content Container */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
                      <div className="flex items-center justify-end">
                        {/* Project Details Card - Keep same design, just scale */}
                        <div className="rounded-3xl p-4 sm:p-6 lg:p-8 relative bg-[url('/download.png')] bg-cover bg-bottom w-[320px] sm:w-[400px] lg:w-[500px]">
                          {/* Status Badge */}
                          <div className="mb-3 sm:mb-4">
                            <span className="inline-flex items-center gap-2 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-yellow-100 text-yellow-800">
                              <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-yellow-500"></span>
                              {t("under_construction")}
                            </span>
                          </div>

                          {/* Project Title with Bottom Border */}
                          <div className="mb-3 sm:mb-4">
                            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                              {project.title}
                            </h2>

                            <div className="description">
                              <p
                                className="text-sm sm:text-base text-gray-800 flex flex-col gap-2 mb-2"
                                dangerouslySetInnerHTML={{
                                  __html: `${project.description.slice(
                                    0,
                                    locale === "ar" ? 180 : 120
                                  )}...`,
                                }}
                              ></p>
                            </div>
                            <div className="w-full h-[1px] bg-gray-300 rounded-full"></div>
                          </div>

                          {/* Location */}
                          <div className="mb-3 sm:mb-4 flex items-center text-gray-800">
                            {/* <svg
                              className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-[#B8860B]"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                              />
                            </svg> */}
                            {/* < className="w-3 sm:w-4 h-3 sm:h-4 mr-2 text-[#B8860B]" /> */}
                            <span className="text-sm text-[#B8860B] sm:text-base">
                              {t("overview")}
                            </span>
                          </div>

                          {/* Floating Button with Arrow - Bottom Right */}
                          <div className="bg-black/20 rounded-full absolute bottom-[-15px] sm:bottom-[-20px] lg:bottom-[-25px] right-[40px] md:right-[50px] sm:right-[50px] lg:right-[65px]">
                            <div className="group inline-flex items-center bg-[#DBA426] hover:bg-[#DBA426] text-white p-2 sm:p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                              <svg
                                className={`w-3 sm:w-4 lg:w-5 h-3 sm:h-4 lg:h-5 transition-transform duration-300 ${
                                  locale === "ar" ? "mirror" : ""
                                }`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>

      {/* PDF Popup */}
      {selectedProject && (
        <PDFPopup
          isOpen={isPDFPopupOpen}
          onClose={handleClosePopup}
          pdfUrl={selectedProject.pdf_lasing || null}
          projectTitle={selectedProject.title}
        />
      )}
    </div>
  );
};
