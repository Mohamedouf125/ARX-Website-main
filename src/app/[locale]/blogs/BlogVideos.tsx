"use client";
import { useTranslations } from "next-intl";
import React, { useState } from "react";

const BlogVideos = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState("");
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const t = useTranslations("blog");
  const featuredCards = [
    {
      id: 1,
      title: "DESIGNED TO MEET",
      subtitle: "",
      description: "Exclusive Interview From The Ramadan Iftar Party!",
      logo: "",
      thumbnail: "https://storage.googleapis.com/furniture-hub/arx/blog-reels/470x705%20(1).jpg",
      videoUrl: "https://youtu.be/X6kSvaGAD9w?si=8YnLtRVfyxE6ByxL"
    },
    {
      id: 2,
      title: "The Hotel Rooms",
      subtitle: "Are equipped with amenities",
      description: "Our Special Projects",
      logo: "logo-lavie.png",
      thumbnail: "https://storage.googleapis.com/furniture-hub/arx/blog-reels/470x705.jpg-kentro.jpg",
      videoUrl: "https://youtu.be/BRBdIjdZNXM?si=hceamdX6UgV8Nany"
    },
  ];

  const featuredVideos = [
    {
      id: 1,
      title: "Rise",
      thumbnail: "https://storage.googleapis.com/furniture-hub/arx/blog-reels/784x784%20(1).jpg",
      videoUrl: "https://youtu.be/yOGEy0iIqeY?si=pmWOa18usZdGwYel"
    },
  ];

  const openModal = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedVideo("");
  };

  return (
    <section className="mb-12 mt-12">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl md:text-2xl font-bold"
          style={{ fontSize: "clamp(1.25rem, 1vw + 1rem, 1.5rem)" }}
        >
          {t("our_videos")}
        </h2>
        <div className="h-0.5 bg-gray-200 flex-grow ml-4"></div>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Main Video */}
        <div className="relative w-full md:w-1/2 h-[450px] overflow-hidden rounded-lg shadow-lg mb-4 md:mb-0">
          <div
            className="relative w-full h-full cursor-pointer"
            onClick={() => openModal(featuredVideos[0].videoUrl)}
          >
            <img
              src={featuredVideos[0].thumbnail}
              alt={featuredVideos[0].title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70 rounded-lg"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white bg-opacity-80 rounded-full p-4">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Cards */}
        <div className="w-full md:w-1/2 flex flex-row space-x-4 h-[450px]">
          {featuredCards.map((card, index) => (
            <div
              key={card.id}
              className={`feature-card relative rounded-lg overflow-hidden shadow-md cursor-pointer ${
                hoveredCard === index
                  ? "w-3/5"
                  : hoveredCard === (index === 0 ? 1 : 0)
                  ? "w-2/5"
                  : index === 1
                  ? "w-3/5"
                  : "w-2/5"
              }`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => openModal(card.videoUrl)}
            >
              <div className="absolute inset-0 bg-gray-300">
                <img
                  src={card.thumbnail}
                  alt={card.title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white bg-opacity-80 rounded-full p-4">
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black/50" onClick={closeModal}></div>
          <div className="relative w-full max-w-4xl mx-4 z-10">
            <button
              onClick={closeModal}
              className="absolute -top-10 right-0 text-white text-2xl"
            >
              ×
            </button>
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={selectedVideo.replace("youtu.be", "www.youtube.com/embed")}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BlogVideos;
