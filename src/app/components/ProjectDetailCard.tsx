"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

// types
import { IProject } from "@/types/interface";

interface ProjectDetailCardProps {
  project: IProject;
  onClose?: () => void;
}

const ProjectDetailCard = ({ project, onClose }: ProjectDetailCardProps) => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);

  const renderMedia = () => {
    if (!project.asssets || project.asssets.length === 0) return null;

    const asset = project.asssets[currentAssetIndex];
    const hasMultipleAssets = project.asssets.length > 1;

    const handlePrevious = () => {
      setCurrentAssetIndex((prev) =>
        prev === 0 ? project.asssets.length - 1 : prev - 1
      );
    };

    const handleNext = () => {
      setCurrentAssetIndex((prev) =>
        prev === project.asssets.length - 1 ? 0 : prev + 1
      );
    };

    const renderCurrentAsset = () => {
      if (asset.type === "video") {
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <video
              src={asset.url}
              loop
              preload="auto"
              playsInline
              autoPlay
              muted
              controls
              className="h-full w-full object-cover"
            />
          </div>
        );
      } else if (asset.type === "image") {
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <Image
              src={asset.url}
              alt={`${project.project_title} - Asset ${currentAssetIndex + 1}`}
              fill
              className="object-cover"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              style={{ userSelect: "none" }}
            />
          </div>
        );
      } else if (asset.type === "figma") {
        return (
          <div className="aspect-video w-full overflow-hidden rounded-lg">
            <iframe src={asset.url} className="h-full w-full" />
          </div>
        );
      }
      return null;
    };

    const handleDragEnd = (
      event: MouseEvent | TouchEvent | PointerEvent,
      {
        offset,
        velocity,
      }: {
        offset: { x: number; y: number };
        velocity: { x: number; y: number };
      }
    ) => {
      const swipeThreshold = 50;
      const swipeVelocityThreshold = 500;

      if (offset.x > swipeThreshold || velocity.x > swipeVelocityThreshold) {
        // Swiped right - go to previous
        handlePrevious();
      } else if (
        offset.x < -swipeThreshold ||
        velocity.x < -swipeVelocityThreshold
      ) {
        // Swiped left - go to next
        handleNext();
      }
    };

    return (
      <div className="relative overflow-hidden rounded-lg">
        <motion.div
          drag={hasMultipleAssets ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          whileDrag={{ scale: 0.95 }}
          className="cursor-grab select-none active:cursor-grabbing"
          style={{
            touchAction: hasMultipleAssets ? "pan-y" : "auto",
            pointerEvents: "auto",
          }}
        >
          {renderCurrentAsset()}
        </motion.div>

        {/* Navigation buttons - only show if multiple assets */}
        {hasMultipleAssets && (
          <>
            {/* Previous button */}
            <motion.button
              onClick={handlePrevious}
              className="absolute top-1/2 left-2 -translate-y-1/2 cursor-pointer rounded-full border border-gray-400 bg-transparent p-2 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              aria-label="Previous asset"
            >
              <div className="flex h-4 w-4 items-center justify-center">
                <div className="h-0 w-0 border-t-[4px] border-r-[6px] border-b-[4px] border-t-transparent border-r-white border-b-transparent"></div>
              </div>
            </motion.button>

            {/* Next button */}
            <motion.button
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer rounded-full border border-gray-400 bg-transparent p-2 backdrop-blur-md transition-all duration-200 hover:scale-110 hover:bg-transparent"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              aria-label="Next asset"
            >
              <div className="flex h-4 w-4 items-center justify-center">
                <div className="h-0 w-0 border-t-[4px] border-b-[4px] border-l-[6px] border-t-transparent border-b-transparent border-l-white"></div>
              </div>
            </motion.button>

            {/* Asset counter */}
            <div className="absolute right-2 bottom-2 rounded-full border border-gray-400 bg-transparent px-2 py-1 text-xs font-bold text-white backdrop-blur-md">
              {currentAssetIndex + 1} / {project.asssets.length}
            </div>
          </>
        )}
      </div>
    );
  };

  const renderBulletPoint = (text: string, index: number) => (
    <motion.div
      key={index}
      className="mb-3 flex items-start gap-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
    >
      <div className="mt-1 h-3 w-3 flex-shrink-0 rounded-full border-2 border-white bg-transparent"></div>
      <p className="text-sm font-normal text-white">{text}</p>
    </motion.div>
  );

  return (
    <div className="relative w-full rounded-xl border border-gray-400 bg-transparent p-4 backdrop-blur-lg">
      {/* Close Button */}
      {onClose && (
        <motion.div
          className="absolute top-2 right-2 z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2, delay: 0.3 }}
        >
          <Button
            onClick={onClose}
            size="icon"
            variant="outline"
            className="h-6 w-6 rounded-full border-gray-400 bg-transparent transition-all duration-200 hover:scale-110 hover:border-gray-400 hover:bg-transparent"
            aria-label="Close"
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <div className="absolute h-0.5 w-3 rotate-45 bg-white"></div>
              <div className="absolute h-0.5 w-3 -rotate-45 bg-white"></div>
            </div>
          </Button>
        </motion.div>
      )}

      {/* Media Section */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="w-full overflow-hidden rounded-lg bg-transparent">
          {renderMedia()}
        </div>
      </motion.div>

      {/* Project Title and Client */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
      >
        <h2 className="mb-2 text-xl font-bold text-white">
          {project.project_title}
        </h2>
        <p className="text-lg font-normal text-white">{project.client}</p>
      </motion.div>

      {/* Overview Section */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="mb-4 text-lg font-bold text-white">Overview</h3>
        <p className="text-sm font-normal text-white">{project.overview}</p>
      </motion.div>

      {/* Two Column Layout for Contribution and Deliverable */}
      <motion.div
        className="mb-4 grid grid-cols-1 gap-8 lg:grid-cols-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {/* Contribution Section */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Contribution</h3>
          <div>
            {project.contribution.map((item, index) =>
              renderBulletPoint(item, index)
            )}
          </div>
        </div>

        {/* Deliverable Section */}
        <div>
          <h3 className="mb-4 text-lg font-bold text-white">Deliverable</h3>
          <div>
            {project.deliverables.map((item, index) =>
              renderBulletPoint(item, index + project.contribution.length)
            )}
          </div>
        </div>
      </motion.div>

      {/* Impact Section */}
      <motion.div
        className="mb-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-bold text-white">Impact</h3>
        <div>
          {project.impact.map((item, index) =>
            renderBulletPoint(
              item,
              index + project.contribution.length + project.deliverables.length
            )
          )}
        </div>
      </motion.div>

      {/* Tags Section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35 }}
      >
        <h3 className="mb-4 text-lg font-bold text-white">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-gray-400 bg-transparent px-2 pb-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
            >
              <span className="text-xs font-bold text-white">{tag}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailCard;
