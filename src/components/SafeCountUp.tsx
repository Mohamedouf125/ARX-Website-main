"use client";
import React, { useState, useEffect } from "react";
import CountUp from "react-countup";

interface SafeCountUpProps {
  start?: number;
  end: number;
  duration?: number;
  className?: string;
  enableScrollSpy?: boolean;
  scrollSpyOnce?: boolean;
  [key: string]: unknown; // Allow other props to be passed through
}

const SafeCountUp: React.FC<SafeCountUpProps> = ({
  start = 0,
  end,
  duration = 3,
  className,
  enableScrollSpy = false,
  scrollSpyOnce = false,
  ...props
}) => {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Don't render anything until mounted and ready
  if (!mounted || !shouldRender) {
    return <span className={className}>{start}</span>;
  }

  try {
    return (
      <CountUp
        start={start}
        end={end}
        duration={duration}
        className={className}
        enableScrollSpy={enableScrollSpy}
        scrollSpyOnce={scrollSpyOnce}
        {...props}
      />
    );
  } catch (error) {
    // Fallback to static number if CountUp fails
    console.warn("CountUp failed, falling back to static number:", error);
    return <span className={className}>{end}</span>;
  }
};

export default SafeCountUp;
