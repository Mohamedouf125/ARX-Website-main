"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ImageType {
  id: number;
  src: string;
  alt: string;
}

const PropertySwiper = () => {
  const [expandedImage, setExpandedImage] = useState<number | null>(1);
  const router = useRouter();

  // Mouse tracker state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Ref for the container to detect hover
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle mouse move
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setMousePosition({ x, y });
  };

  // Track hover events
  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  // Listen to mouse movement within container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener("mousemove", handleMouseMove);
      return () => {
        containerRef.current?.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  const images: ImageType[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      alt: "Modern residential building with green spaces",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      alt: "Contemporary office building",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=300&fit=crop",
      alt: "Luxury apartment complex with pool",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
      alt: "Modern high-rise apartment building",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
      alt: "Luxury modern skyscraper",
    },
  ];

  const handleImageClick = (imageId: number) => {
    router.push(`/property/${imageId}`);
  };

  const handleImageHover = (imageId: number) => {
    setExpandedImage(imageId);
  };

  return (
    <div className="w-full h-screen bg-black mx-auto p-2 md:p-4 flex flex-col relative overflow-hidden">
      <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-6 text-center text-white">Property Gallery</h2>

      {/* Mouse Tracker Overlay */}
      {isHovering && (
        <div
          className="absolute pointer-events-none z-20 transition-opacity duration-300"
          style={{
            left: `${mousePosition.x}px`,
            top: `${mousePosition.y}px`,
            transform: "translate(-40%, -0%)",
          }}
        >
<div className="
  bg-black/10 
  backdrop-blur-lg 
  backdrop-saturate-150 
  rounded-full
  w-42 h-42 
  flex items-center justify-center 
  border border-white/10 
  shadow-xl 
  opacity-90
  ring-1 ring-inset ring-white/5
">            <span className="text-white font-medium text-lg">View Project</span>
          </div>
        </div>
      )}

      {/* Images in a responsive row */}
      <div
        ref={containerRef}
        className="w-full flex overflow-hidden flex-1 items-center relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {images.map((image) => {
          const isExpanded = expandedImage === image.id;
          const totalImages = images.length;

          const expandedWidth = window.innerWidth < 768 ? "60%" : "50%";
          const collapsedWidth = `${(window.innerWidth < 768 ? 40 : 50) / (totalImages - 1)}%`;

          return (
            <div
              key={image.id}
              className="transition-all duration-500 ease-in-out cursor-pointer h-full"
              onClick={() => handleImageClick(image.id)}
              onMouseEnter={() => handleImageHover(image.id)}
              style={{
                flexBasis: isExpanded ? expandedWidth : collapsedWidth,
                flexShrink: 0,
              }}
            >
              <div className="relative h-full overflow-hidden transition-shadow">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4">
                  <p
                    className={`text-white font-medium transition-all duration-300 ${
                      isExpanded ? "text-sm md:text-lg opacity-100" : "text-xs md:text-sm opacity-80"
                    }`}
                  >
                    {image.alt}
                  </p>
                </div>
                {isExpanded && (
                  <div className="absolute top-2 right-2 md:top-4 md:right-4 bg-white/20 backdrop-blur-sm rounded-full p-1 md:p-2">
                    <svg
                      className="w-3 h-3 md:w-5 md:h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PropertySwiper;