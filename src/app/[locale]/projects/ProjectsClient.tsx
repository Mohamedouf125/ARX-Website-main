"use client";
import React, { useState } from "react";
import { ProjectType } from "@/libs/types/types";
import ProjectCard from "./components/ProjectCard";
import Filter from "./components/Filter";

interface ProjectsClientProps {
  projects: ProjectType[];
}

const ProjectsClient: React.FC<ProjectsClientProps> = ({ projects }) => {
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectType[]>(projects);

  const handleFilterChange = (newFilteredProjects: ProjectType[]) => {
    setFilteredProjects(newFilteredProjects);
  };

  return (
    <section className="bg-white pt-20 lg:pb-10 px-6 relative z-10 overflow-hidden rounded-3xl">
      <div className="max-w-7xl mx-auto">
        {/* filter */}
        <Filter projects={projects} onFilterChange={handleFilterChange} />

        {/* Projects Grid */}
        <div className="w-full pb-20 overflow-hidden">
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-gray-500 text-lg mb-4">
                No projects found matching your filters
              </div>
              <button
                onClick={() => setFilteredProjects(projects)}
                className="bg-[#dba426] text-white px-6 py-2 rounded-lg hover:bg-black transition-colors"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project: ProjectType, index: number) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsClient;
