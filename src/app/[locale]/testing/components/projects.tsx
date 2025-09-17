import React from "react";

interface ServiceCardProps {
  image: string;
  title: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  delay?: number; // ms
}

export default function ServiceCard({
  image,
  title,
  href = "#",
  onClick,
  className = "",
  delay = 0,
}: ServiceCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`group relative flex flex-col min-h-[370px] rounded-[30px_0_30px_30px] 
                  bg-white transition-colors duration-300 
                  hover:bg-yellow-400
                  p-10 pr-[60px] shadow-md hover:shadow-xl ${className}`}
    >
      {/* Title */}
      <h5 className="mb-auto text-2xl font-bold leading-tight text-gray-900 group-hover:text-white">
        <a
          href={href}
          onClick={handleClick}
          className="transition-colors duration-300"
        >
          {title.split("<br>").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </a>
      </h5>

      {/* Bottom image */}
      <img
        src={image}
        alt={title}
        className="pointer-events-none absolute -bottom-[30px] -left-[30px] h-auto max-w-[345px] w-auto transition-transform duration-500 group-hover:-translate-y-[10px]"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}
