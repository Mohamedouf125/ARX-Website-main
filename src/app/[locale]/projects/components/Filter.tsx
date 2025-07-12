"use client";
import React, { useState, useMemo, useEffect } from "react";
import { ProjectType } from "@/libs/types/types";
import { Button } from "@/components/ui/button";
import { X, Search } from "lucide-react";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

// Dynamically import Select components to avoid SSR issues
const Select = dynamic(
  () =>
    import("@/components/ui/select").then((mod) => ({ default: mod.Select })),
  {
    ssr: false,
    loading: () => (
      <div className="shadow-none outline-none ring-0 p-6 py-8 w-full rounded-full bg-gray-100 border-none animate-pulse" />
    ),
  }
);

const SelectContent = dynamic(
  () =>
    import("@/components/ui/select").then((mod) => ({
      default: mod.SelectContent,
    })),
  {
    ssr: false,
  }
);

const SelectTrigger = dynamic(
  () =>
    import("@/components/ui/select").then((mod) => ({
      default: mod.SelectTrigger,
    })),
  {
    ssr: false,
  }
);

const SelectValue = dynamic(
  () =>
    import("@/components/ui/select").then((mod) => ({
      default: mod.SelectValue,
    })),
  {
    ssr: false,
  }
);

const SelectItem = dynamic(
  () =>
    import("@/components/ui/select").then((mod) => ({
      default: mod.SelectItem,
    })),
  {
    ssr: false,
  }
);

interface FilterProps {
  projects: ProjectType[];
  onFilterChange: (filteredProjects: ProjectType[]) => void;
}

function Filter({ projects, onFilterChange }: FilterProps) {
  const t = useTranslations("projects");
  const [location, setLocation] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get unique locations and budgets
  const uniqueLocations = useMemo(() => {
    if (!mounted) return [];
    const locations = projects
      .map((project) => project.location)
      .filter(Boolean);
    return [...new Set(locations)];
  }, [projects, mounted]);

  const uniqueBudgets = useMemo(() => {
    if (!mounted) return [];
    const budgets = projects
      .map((project) => `${project.start_price} - ${project.end_price}`)
      .filter(Boolean);
    return [...new Set(budgets)];
  }, [projects, mounted]);

  // Apply filters when search button is clicked
  const applyFilters = () => {
    if (!mounted) return;

    let filteredProjects = [...projects];

    // Filter by location
    if (location) {
      filteredProjects = filteredProjects.filter(
        (project) => project.location === location
      );
    }

    // Filter by budget
    if (budget) {
      filteredProjects = filteredProjects.filter((project) => {
        const projectBudget = `${project.start_price} - ${project.end_price}`;
        return projectBudget === budget;
      });
    }

    onFilterChange(filteredProjects);
  };

  // Clear all filters
  const clearFilters = () => {
    setLocation("");
    setBudget("");
    onFilterChange(projects);
  };

  return (
    <div suppressHydrationWarning>
      <div className="filters mb-10 border-b border-gray-200 pb-10">
        <ul className="flex flex-col md:flex-row gap-4">
          <li className="w-full">
            {mounted ? (
              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="shadow-none outline-none ring-0 p-6 py-6 md:py-8 w-full rounded-full bg-gray-100 border-none">
                  <SelectValue placeholder={t("project_location")} />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl">
                  {uniqueLocations.map((location, index) => (
                    <SelectItem key={index} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="shadow-none outline-none ring-0 p-6 py-3 md:py-8 w-full rounded-full bg-gray-100 border-none">
                <div className="text-gray-500">{t("project_location")}</div>
              </div>
            )}
          </li>
          <li className="w-full">
            {mounted ? (
              <Select value={budget} onValueChange={setBudget}>
                <SelectTrigger className="shadow-none outline-none ring-0 p-6 py-6 md:py-8 w-full rounded-full bg-gray-100 border-none">
                  <SelectValue placeholder={t("project_budget")} />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-xl">
                  {uniqueBudgets.map((budget, index) => (
                    <SelectItem key={index} value={budget}>
                      {budget}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <div className="shadow-none outline-none ring-0 p-6 py-8 w-full rounded-full bg-gray-100 border-none">
                <div className="text-gray-500">{t("project_budget")}</div>
              </div>
            )}
          </li>
          <li className="w-full flex-1/3">
            <Button
              onClick={applyFilters}
              disabled={!location && !budget}
              className="w-full rounded-full bg-[#dba426] px-6 py-3 md:py-0 text-white hover:bg-black h-full flex items-center justify-center gap-2 transition-all duration-300"
              size="lg"
            >
              <Search className="w-8 h-8" />
              <span className="text-[18px] font-[500]">{t("search")}</span>
            </Button>
          </li>
        </ul>

        {/* Active Filters Display */}
        {mounted && (location || budget) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {location && (
              <span className="bg-[#dba426] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {location}
                <button
                  onClick={() => setLocation("")}
                  className="hover:text-red-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            {budget && (
              <span className="bg-[#dba426] text-white px-3 py-1 rounded-full text-sm flex items-center gap-2">
                {budget}
                <button
                  onClick={() => setBudget("")}
                  className="hover:text-red-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </span>
            )}
            <button
              onClick={clearFilters}
              className="bg-red-500 text-white px-3 py-1 rounded-full text-sm hover:bg-red-600 transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Filter;
