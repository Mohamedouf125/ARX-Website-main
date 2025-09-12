"use client";
import React, { useRef, useState, useEffect } from "react";
import Head from "next/head";
import { useTranslations } from "next-intl";
import { ShortsTypes } from "@/libs/types/types";
import SmallHeadSpan from "../SharedComponent/SmallHeadSpan";
import { AnimatedElement } from "../animations/AnimationType";

// Update image imports to use public path
const sliderImage01 =
  "/images/home/bba65e126777dbdbc37dcfc38ab04c9113908d13.png";

export default function ShortsPage({ shorts }: { shorts: ShortsTypes[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const t = useTranslations("shorts");

  // Drag scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const scroll = (dir: "left" | "right") => {
    if (!containerRef.current) return;
    const width = containerRef.current.clientWidth;
    containerRef.current.scrollBy({
      left: dir === "left" ? -width : width,
      behavior: "smooth",
    });
  };

  const openVideoModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setShowModal(true);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
    setShowModal(false);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

  // Handle drag start
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
    containerRef.current.style.cursor = 'grabbing';
  };

  // Handle drag move
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed multiplier
    containerRef.current.scrollLeft = scrollLeft - walk;
    
    // If mouse moved more than 5px, consider it a drag
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
  };

  // Handle drag end
  const handleMouseUp = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    setIsDragging(false);
    containerRef.current.style.cursor = 'grab';
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.touches[0].pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !containerRef.current) return;
    const x = e.touches[0].pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
    
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Handle play button click
  const handlePlayClick = (e: React.MouseEvent, videoUrl: string) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!hasDragged) {
      openVideoModal(videoUrl);
    }
  };

  // Close modal on escape key press
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && showModal) {
        closeVideoModal();
      }
    };

    window.addEventListener("keydown", handleEscKey);
    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [showModal]);

  return (
    <>
      <Head>
        <title>Our Shorts – O7 Mall</title>
        <meta
          name="description"
          content="A glimpse into our journey, one reel at a time."
        />
      </Head>

      <main className="py-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center mb-5">
            <SmallHeadSpan>{t("title")}</SmallHeadSpan>
          </div>

          <AnimatedElement
            type="slideUp"
            duration={1}
            className="w-full h-full"
          >
            <h2
              className="mt-2 text-center font-[Cinzel] text-3xl md:text-4xl font-bold uppercase"
              dangerouslySetInnerHTML={{ __html: t("description") }}
            />
          </AnimatedElement>

          <AnimatedElement type="fadeIn" duration={1} className="w-full h-full">
            <div className="relative mt-8">
              {/* Left Arrow - Now visible on all screens */}
              <button
                onClick={() => scroll("left")}
                aria-label="Previous"
                className="absolute top-1/2 -left-2 md:left-2 -translate-y-1/2 p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 z-10"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.79289 19.2559C10.1834 19.6465 10.8166 19.6465 11.2071 19.2559C11.5976 18.8654 11.5976 18.2322 11.2071 17.8417L6.91421 13.5488L20.5 13.5488C21.0523 13.5488 21.5 13.1011 21.5 12.5488C21.5 11.9965 21.0523 11.5488 20.5 11.5488L6.91421 11.5488L11.2071 7.25593C11.5976 6.86541 11.5976 6.23225 11.2071 5.84172C10.8166 5.4512 10.1834 5.4512 9.79289 5.84172L3.79289 11.8417C3.40237 12.2322 3.40237 12.8654 3.79289 13.2559L9.79289 19.2559Z"
                    fill="white"
                  />
                </svg>
              </button>

              {/* Scrollable Track with Drag Support */}
              <div className="px-0 md:px-15">
                <div
                  ref={containerRef}
                  className="flex space-x-4 md:space-x-6 overflow-x-auto snap-x snap-mandatory hideScrollbar pl-4 md:pl-0 cursor-grab select-none scroll-smooth"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseLeave}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    cursor: isDragging ? 'grabbing' : 'grab',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none',
                    scrollBehavior: 'smooth'
                  }}
                >
                  {shorts.map((video: ShortsTypes, index: number) => (
                    <div
                      key={video?.id || index}
                      className="snap-start min-w-[calc(80vw-2rem)] md:min-w-[320px] lg:min-w-[300px] h-[500px] bg-white rounded-xl overflow-hidden relative"
                      style={{ userSelect: 'none' }}
                    >
                      {/* Background Image */}
                      <div className="relative w-full h-full pointer-events-none">
                        <img
                          src={
                            video?.thumbnail ||
                            video?.background ||
                            sliderImage01
                          }
                          alt={video?.title || "Video thumbnail"}
                          className="brightness-90 w-full h-full object-cover"
                          draggable={false}
                        />

                        {/* Play button overlay - Only this is clickable */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <button
                            className="w-16 h-16 bg-white bg-opacity-80 rounded-full flex items-center justify-center pointer-events-auto hover:bg-opacity-100 transition-all hover:scale-110"
                            onClick={(e) => handlePlayClick(e, video?.video)}
                            aria-label="Play video"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M8 5V19L19 12L8 5Z" fill="#0066CC" />
                            </svg>
                          </button>
                        </div>

                        {/* Video info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent text-white pointer-events-none">
                          <h3 className="font-bold text-lg">{video?.title}</h3>
                          {video?.location && (
                            <p className="text-sm opacity-80">
                              {video?.location}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Arrow - Now visible on all screens */}
              <button
                onClick={() => scroll("right")}
                aria-label="Next"
                className="absolute top-1/2 -right-2 md:right-2 -translate-y-1/2 p-2 bg-black bg-opacity-30 rounded-full hover:bg-opacity-50 z-10"
              >
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.2071 5.84172C14.8166 5.4512 14.1834 5.4512 13.7929 5.84172C13.4024 6.23225 13.4024 6.86541 13.7929 7.25593L18.0858 11.5488H4.5C3.94772 11.5488 3.5 11.9965 3.5 12.5488C3.5 13.1011 3.94772 13.5488 4.5 13.5488H18.0858L13.7929 17.8417C13.4024 18.2322 13.4024 18.8654 13.7929 19.2559C14.1834 19.6465 14.8166 19.6465 15.2071 19.2559L21.2071 13.2559C21.5976 12.8654 21.5976 12.2322 21.2071 11.8417L15.2071 5.84172Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </AnimatedElement>
        </div>
      </main>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden">
            <button
              onClick={closeVideoModal}
              className="absolute top-4 right-4 z-10 p-2 bg-black rounded-full text-white hover:bg-white hover:text-black transition-colors"
              aria-label="Close modal"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={selectedVideo + "?autoplay=1"}
                title="Video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
}