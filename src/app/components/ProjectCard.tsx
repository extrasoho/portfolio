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

  // Control video playback based on hover state
  useEffect(() => {
    if (videoRef.current && asset?.type === "video") {
      if (isHovered) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, asset?.type]);

  if (!asset) {
    return null; // Don't render if no asset
  }

  return (
    <div
      className="group relative h-64 cursor-pointer overflow-hidden rounded-lg bg-gray-100 transition-transform duration-300 ease-in-out hover:scale-105"
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
          autoPlay={false}
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
        <div className="h-full w-full bg-gray-200"></div>
      )}

      {/* Hover Overlay */}
      <div
        className={`absolute bottom-4 left-1/2 flex h-[70px] w-[90%] transform flex-col items-center justify-center rounded-xl border border-black bg-[#F9F1E4] p-4 shadow-[3px_3px_0px_0px_rgb(0,0,0)] transition-all duration-300 ease-in-out ${
          isHovered
            ? "-translate-x-1/2 translate-y-0 opacity-100"
            : "-translate-x-1/2 translate-y-full opacity-0"
        }`}
      >
        <h3 className="mb-1 text-center text-sm font-bold text-black">
          {project.project_title}
        </h3>
        <p className="text-center text-xs text-gray-700">{project.client}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
