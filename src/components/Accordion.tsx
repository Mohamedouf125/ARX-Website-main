"use client";
import React, { useState } from "react";
import { ChevronDownIcon, HelpCircleIcon } from "lucide-react";
import { useLocale } from "next-intl";

interface AccordionItem {
  id: string;
  title: string;
  description: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const locale = useLocale();

  const toggleItem = (itemId: string) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(itemId)) {
      newOpenItems.delete(itemId);
    } else {
      newOpenItems.clear();
      newOpenItems.add(itemId);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);

        return (
          <div
            key={item.id}
            className={`border-t border-b${
              index === items.length - 1 ? "border-b-gray-200" : ""
            }`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleItem(item.id)}
              className={`w-full px-6 py-8 flex items-center justify-between gap-4 transition-all duration-300 group ${locale === "en" ? "text-left" : "text-right"}`}
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              {/* Left: Question Icon */}
              <div className="flex-shrink-0">
                <HelpCircleIcon
                  className={`transition-all duration-300 bg-[#dba426] text-white p-2 w-10 h-10 rounded-full rounded-br-none ${
                    isOpen ? "bg-black" : "group-hover:bg-black "
                  }`}
                />
              </div>

              {/* Center: Title */}
              <div className="w-md">
                <h3
                  className={`text-[16px] md:text-[18px] font-semibold transition-all duration-300`}
                >
                  {item.title}
                </h3>
              </div>

              {/* Right: Arrow Icon */}
              <div className="flex-shrink-0">
                <ChevronDownIcon
                  className={`w-5 h-5 transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "rotate-180 text-black"
                      : "rotate-0 text-[#035B8D] group-hover:text-black"
                  }`}
                />
              </div>
            </button>

            {/* Accordion Content */}
            <div
              id={`accordion-content-${item.id}`}
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isOpen ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
              }`}
              style={{
                transitionProperty: "max-height, opacity, padding",
                transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            >
              <div
                className={`px-6 transition-all duration-500 ${
                  isOpen ? "pb-8" : "pb-0"
                }`}
              >
                <div className="">
                  <p className="text-gray-700 leading-relaxed text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
