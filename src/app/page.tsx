"use client";

import React, { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

// components
import ProfileCard from "./components/ProfileCard";
import PressCard from "./components/PressCard";
import ContactCard from "./components/ContactCard";
import Header from "./components/Header";
import Ticker from "./components/Ticker";
import ProjectCard from "./components/ProjectCard";
import ProjectDetailCard from "./components/ProjectDetailCard";

// TODO: Add projects from the API
import projects from "@/assets/projects.json";

// types
import { IProject } from "@/types/interface";

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter projects based on active filter
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.tag === activeFilter);

  const handleFilterChange = (filterTag: string) => {
    setActiveFilter(filterTag);
    // Close any open project detail when filter changes
    setSelectedProject(null);
  };

  return (
    <div className="mx-auto h-screen max-w-[1440px] p-2 lg:p-4 xl:p-8">
      <div className="grid h-full grid-cols-7">
        <aside className="col-span-7 flex h-full max-h-full flex-col gap-4 overflow-hidden md:sticky md:top-8 md:col-span-2">
          <ProfileCard />
          <PressCard />
          <ContactCard />
        </aside>
        <div
          ref={scrollContainerRef}
          className="scrollbar-hide col-span-7 flex flex-col gap-4 overflow-visible px-0 py-4 md:col-span-5 md:overflow-y-auto lg:px-2 lg:py-0 xl:px-4"
        >
          <Header
            activeFilter={activeFilter}
            onFilterChange={handleFilterChange}
          />

          <div className="relative flex h-full w-full flex-col justify-between gap-4 overflow-visible">
            <AnimatePresence mode="wait">
              {selectedProject && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "fit-content", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    ease: [0.04, 0.62, 0.23, 0.98],
                  }}
                  className="w-full"
                >
                  <motion.div
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                    exit={{ y: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    <ProjectDetailCard
                      project={selectedProject}
                      onClose={() => setSelectedProject(null)}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <div className="grid grid-cols-7 gap-4">
              {filteredProjects.map((project, index) => (
                <div
                  className={`col-span-7 ${
                    index % 6 === 2 || index % 6 === 3
                      ? "md:col-span-3"
                      : "md:col-span-2"
                  }`}
                  key={project.id}
                >
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => {
                      setSelectedProject(project);
                      // Scroll to top when project card is clicked
                      // Try multiple approaches to ensure scrolling works
                      setTimeout(() => {
                        // First try the scroll container
                        if (scrollContainerRef.current) {
                          scrollContainerRef.current.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }
                        // Also try window scroll as fallback
                        window.scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      }, 100);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="sticky right-4 bottom-0 left-4 z-10">
              <Ticker />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
