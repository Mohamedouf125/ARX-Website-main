import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";

function SectionButton({
  children,
  href,
}: {
  children: React.ReactNode;
  href: string;
}) {
  const locale = useLocale();

  console.log(locale);

  return (
    <div className="flex font-[sans-serif]">
      <Link
        href={href}
        className={`group flex items-center bg-white justify-center p-2 ${
          locale === "en" ? "pl-5" : "pr-5"
        } rounded-full border border-gray-300 hover:bg-black  hover:border-black transition-all duration-300`}
      >
        <span className="inline-flex gap-2 items-center font-medium text-[#dba426]  group-hover:text-white transition-all duration-300 rounded-full cursor-pointer">
          <span className="text-[16px] font-[600]">{children}</span>
          <svg
            className="w-10 h-10 bg-[#dba426]  rounded-full p-1 text-white group-hover:rotate-305 transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </Link>
    </div>
  );
}

export default SectionButton;
