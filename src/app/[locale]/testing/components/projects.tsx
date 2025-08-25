import React from "react";
import { ArrowUpRight } from "lucide-react";

interface ServiceCardProps {
  image: string;
  title: string;
  description: string;
  onClick?: () => void;
  className?: string;
}

export default function ServiceCard({
  image,
  title,
  description,
  onClick,
  className = "",
}: ServiceCardProps) {
  return (
    <div
      className={`w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-sm xl:max-w-md 2xl:max-w-lg border p-2 sm:p-3 mx-auto rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${className}`}
      onClick={onClick}
    >
      {/* Image Container */}
      <div className="relative h-40 sm:h-48 md:h-56 lg:h-44 xl:h-52 2xl:h-56 mb-1 sm:mb-2">
        {/* Building Image */}
        <img
          src={image}
          className="rounded-lg sm:rounded-xl w-full h-full object-cover"
          alt={title}
        />

        {/* Arrow Icon */}
        <div className="absolute right-2 sm:right-3 md:right-4 p-1 sm:p-2 rounded-full bg-white -bottom-[2vw]">
          <div className="bg-yellow-400 rounded-full p-2 sm:p-3 shadow-lg">
            <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-black" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5">
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-bold text-gray-900 mb-2 leading-tight">
          {title}
        </h1>
        <div className="py-1 sm:py-2 md:py-3">
          <hr className="border-gray-200" />
        </div>
        <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed line-clamp-3 sm:line-clamp-none">
          {description}
        </p>
      </div>
    </div>
  );
}
