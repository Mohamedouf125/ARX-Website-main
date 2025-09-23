import React from "react";

interface ServiceCardProps {
  image: string;
  title: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  delay?: number;
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
      className={`group relative flex flex-col min-h-[370px] bg-white 
                  rounded-tl-[30px] rounded-tr-0 rounded-bl-[30px] rounded-br-[30px]
                  p-10 pr-[60px] transition-all duration-500 ease-in-out
                  hover:bg-[#DBA426] overflow-hidden ${className}`}
      style={{
        animationDelay: `${delay}ms`,
        animationFillMode: "both",
      }}
    >
      {/* Arrow Button - Top Right */}
      {/* <a
        href={href}
        onClick={handleClick}
        className="absolute top-0 right-0 z-30 p-4 transition-all duration-300 
                   hover:bg-transparent group-hover:bg-blue-500"
        role="button"
      >
        <span className="flex items-center justify-center">
          <span className="inline-block">
            <svg
              className="w-6 h-6 text-gray-600 group-hover:text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </span>
      </a> */}

      {/* Title */}
      <h5 className="mb-auto z-20 relative">
        <a
          href={href}
          onClick={handleClick}
          className="text-2xl font-bold leading-tight text-gray-800 
                     transition-colors duration-300 hover:text-gray-700
                     block"
        >
          {title.split("<br>").map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </a>
      </h5>

      {/* Decorative Corner Element - Top Right */}
      <div
        className="absolute top-0 right-0 w-[60px] h-[60px] bg-gray-50 
                      rounded-bl-[30px] z-10"
      >
        {/* Top Left Corner Shape */}
        <div
          className="absolute -left-[30px] top-0 w-[30px] h-[30px] bg-gray-50"
          style={{
            clipPath: 'path("M0 0 Q0,30 30,30 L 0 30 Z")',
            transform: "rotate(180deg)",
          }}
        ></div>
        {/* Bottom Right Corner Shape */}
        <div
          className="absolute bottom-[-30px] right-0 w-[30px] h-[30px] bg-gray-50"
          style={{
            clipPath: 'path("M0 0 Q0,30 30,30 L 0 30 Z")',
            transform: "rotate(180deg)",
          }}
        ></div>
      </div>

      {/* Bottom Left Image */}
      <img
        src={image}
        alt={title}
        className="absolute bottom-[0px] -left-[30px] h-auto max-w-[250px] w-auto 
                   transition-transform duration-500 group-hover:-translate-y-[10px] z-0"
      />
    </div>
  );
}

// Demo component to show the cards in action
// function ServiceCardDemo() {
//   const services = [
//     {
//       title: "Real Estate <br>Development",
//       image: "/api/placeholder/345/246",
//       href: "#real-estate",
//     },
//     {
//       title: "Project <br>Management",
//       image: "/api/placeholder/378/246",
//       href: "#project-management",
//     },
//     {
//       title: "Investment & <br> Capital",
//       image: "/api/placeholder/401/246",
//       href: "#investment",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
//           Our Services
//         </h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <ServiceCard
//               key={index}
//               title={service.title}
//               image={service.image}
//               href={service.href}
//               delay={index * 200}
//               className="animate-fade-in-up"
//               onClick={() => console.log(`Clicked ${service.title}`)}
//             />
//           ))}
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fade-in-up {
//           from {
//             opacity: 0;
//             transform: translateY(30px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }

//         .animate-fade-in-up {
//           animation: fade-in-up 0.6s ease-out forwards;
//           opacity: 0;
//         }
//       `}</style>
//     </div>
//   );
// }
