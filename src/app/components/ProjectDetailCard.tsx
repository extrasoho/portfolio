"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// types
import { IProject, IAsset } from "@/types/interface";

interface ProjectDetailCardProps {
  project: IProject;
  onClose?: () => void;
}

const ProjectDetailCard = ({ project, onClose }: ProjectDetailCardProps) => {
  const [currentAssetIndex, setCurrentAssetIndex] = useState(0);

  const renderMedia = () => {
    if (!project.asssets || project.asssets.length === 0) return null;

    const renderAsset = (asset: IAsset, index: number) => {
      if (asset.type === "video") {
        return (
          <div
            key={index}
            className="aspect-video w-full overflow-hidden rounded-lg"
          >
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
          <div
            key={index}
            className="relative aspect-video w-full overflow-hidden rounded-lg"
          >
            <Image
              src={asset.url}
              alt={`${project.project_title} - Asset ${index + 1}`}
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
          <div
            key={index}
            className="aspect-video w-full overflow-hidden rounded-lg"
          >
            <iframe src={asset.url} className="h-full w-full" />
          </div>
        );
      }
      return null;
    };

    const sliderSettings = {
      dots: project.asssets.length > 1,
      infinite: project.asssets.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: project.asssets.length > 1,
      swipe: project.asssets.length > 1,
      touchMove: project.asssets.length > 1,
      beforeChange: (current: number, next: number) =>
        setCurrentAssetIndex(next),
      customPaging: (i: number) => (
        <div className="mx-1 h-3 w-3 rounded-full bg-white/30 transition-colors duration-200 hover:bg-white/60" />
      ),
      dotsClass:
        "slick-dots !flex !justify-center !items-center !bottom-4 !static mt-4",
    };

    if (project.asssets.length === 1) {
      return (
        <div className="overflow-hidden rounded-lg">
          {renderAsset(project.asssets[0], 0)}
        </div>
      );
    }

    return (
      <div className="overflow-hidden rounded-lg">
        <style>{`
           .slick-dots .slick-active div {
             background-color: rgba(255, 255, 255, 1) !important;
           }
         `}</style>
        <Slider {...sliderSettings}>
          {project.asssets.map((asset, index) => renderAsset(asset, index))}
        </Slider>
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
