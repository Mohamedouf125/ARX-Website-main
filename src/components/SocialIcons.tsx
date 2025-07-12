import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";

interface SocialIconsProps {
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
  };
  size?: "sm" | "md" | "lg";
  className?: string;
}

const SocialIcons: React.FC<SocialIconsProps> = ({
  social,
  size = "md",
  className = "",
}) => {
  const socialIcons = {
    facebook: FaFacebook,
    instagram: FaInstagram,
    twitter: FaTwitter,
    youtube: FaYoutube,
    linkedin: FaLinkedin,
  };

  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  return (
    <div className={`flex ${className} bg-transparent`}>
      {Object.entries(social).map(([platform, url]) => {
        const IconComponent = socialIcons[platform as keyof typeof socialIcons];
        if (!IconComponent || !url) return null;

        return (
          <a
            key={platform}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${sizeClasses[size]} flex items-center justify-center transition-all duration-300 text-gray-300 hover:text-[#035B8D]`}
            aria-label={`Follow on ${platform}`}
          >
            <IconComponent className={iconSizes[size]} />
          </a>
        );
      })}
    </div>
  );
};

export default SocialIcons;
