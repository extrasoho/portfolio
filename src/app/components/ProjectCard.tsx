"use client";

import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

// types
import { IProject } from "@/types/interface";

interface ProjectCardProps {
  project: IProject;
  onClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Get the first asset (assuming one asset per project for now)
  const asset = project.asssets?.[0];

  // Handle video autoplay after component mounts to avoid hydration issues
  useEffect(() => {
    if (videoRef.current && asset?.type === "video") {
      const video = videoRef.current;
      video.play().catch((error) => {
        // Silently handle autoplay failures (common in browsers)
        console.log("Autoplay prevented:", error);
      });
    }
  }, [asset?.type]);

  if (!asset) {
    return null; // Don't render if no asset
  }

  return (
    <div
      className="group relative h-64 cursor-pointer overflow-hidden rounded-lg bg-transparent backdrop-blur-md transition-transform duration-300 ease-in-out hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Asset Display */}
      {asset.type === "video" ? (
        <video
          ref={videoRef}
          src={asset.url}
          className="h-full w-full object-cover"
          muted
          loop
          playsInline
        />
      ) : asset.type === "image" ? (
        <Image
          src={asset.url}
          alt={project.project_title}
          className="h-full w-full object-cover"
          width={400}
          height={300}
        />
      ) : asset.type === "figma" ? (
        <iframe
          src={asset.url}
          width="800"
          height="450"
          className="pointer-events-none w-full rounded-lg"
        />
      ) : (
        <div className="h-full w-full bg-transparent"></div>
      )}

      {/* Hover Overlay */}
      <div
        className={`absolute bottom-4 left-1/2 flex h-auto min-h-[70px] w-[90%] transform flex-col items-center justify-center rounded-xl border border-gray-400 bg-black/70 p-4 backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isHovered
            ? "-translate-x-1/2 translate-y-0 opacity-100"
            : "-translate-x-1/2 translate-y-full opacity-0"
        }`}
      >
        <h3 className="mb-1 text-left text-sm font-bold text-white">
          {project.project_title}
        </h3>
        <p className="text-left text-xs text-white">{project.client}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
