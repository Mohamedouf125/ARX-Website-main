"use client";

import Link from "next/link";
import { useState, memo, useCallback } from "react";

interface HoverLinkProps {
  href: string;
  title: string;
}

const HoverLink = memo(({ href, title }: HoverLinkProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <Link
      href={href}
      className="text-black no-underline text-lg font-[700] font-[Cinzel] capitalize relative group/title leading-none"
      style={{
        backgroundImage: "linear-gradient(to right, #035B8D, #035B8D)",
        backgroundSize: isHovered ? "100% 2px" : "0% 2px",
        backgroundPosition: "0 100%",
        backgroundRepeat: "no-repeat",
        transition: "background-size 0.3s ease-out",
        display: "inline",
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
        paddingBottom: "2px",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {title}
    </Link>
  );
});

HoverLink.displayName = "HoverLink";

export default HoverLink;
