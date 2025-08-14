"use client";

import React, { useEffect, useState } from "react";
// import { useTranslations } from "next-intl";
import { getData } from "@/libs/axios/server";
import { AxiosHeaders } from "axios";

interface CoreValue {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface ValueWithProps extends CoreValue {
  icon: React.ReactNode;
  animation: string;
  delay?: number;
}

function OurValues() {
  // const t = useTranslations("core_values");
  const [apiValues, setApiValues] = useState<CoreValue[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoreValues = async () => {
      try {
        const response = await getData(
          `core-values`,
          {},
          new AxiosHeaders({
            // Add locale if needed
            // lang: locale,
          })
        );
        setApiValues(response.data || []);
      } catch (error) {
        console.error("Error fetching core values:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCoreValues();
  }, []);

  if (loading) {
    return []; // Return empty array while loading to maintain the same structure
  }

  const values: ValueWithProps[] = apiValues.map((value, index) => ({
    ...value,
    icon: (
      <img
        src={value.image}
        alt={value.title}
        width="40"
        height="40"
        className="w-10 h-10 object-contain"
      />
    ),
    animation: "slideUp",
    delay: index * 0.2, // Stagger the animation delays
  }));

  return values;
}

export default OurValues;
