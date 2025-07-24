"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// types
import { IProject } from "@/types/interface";

interface ProjectDetailCardProps {
  project: IProject;
  onClose?: () => void;
}

const ProjectDetailCard = ({ project, onClose }: ProjectDetailCardProps) => {
  const renderMedia = () => {
    if (!project.asssets || project.asssets.length === 0) return null;

    const asset = project.asssets[0];
    if (asset.type === "video") {
      return (
        <video
          src={asset.url}
          loop
          preload="auto"
          playsInline
          autoPlay
          muted
          controls
          className="w-full rounded-lg"
        />
      );
    } else if (asset.type === "image") {
      return (
        <Image
          src={asset.url}
          alt={project.project_title}
          width={800}
          height={600}
          className="h-auto w-full rounded-lg"
        />
      );
    } else if (asset.type === "figma") {
      return (
        <iframe
          src={asset.url}
          width="800"
          height="450"
          className="w-full rounded-lg"
        />
      );
    }
    return null;
  };

  const renderBulletPoint = (text: string, index: number) => (
    <motion.div
      key={index}
      className="mb-3 flex items-start gap-3"
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }}
    >
      <div className="mt-1 h-4 w-4 flex-shrink-0 rounded-full bg-[#F57E07]"></div>
      <p className="text-lg leading-6 font-normal">{text}</p>
    </motion.div>
  );

  return (
    <div className="relative w-full rounded-xl border border-black bg-[#F9F1E4] p-4 shadow-[3px_3px_0px_0px_rgb(0,0,0)]">
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
            className="h-6 w-6 rounded-full border-black bg-[#F57E07] transition-all duration-200 hover:scale-110 hover:border-black hover:bg-orange-600"
            aria-label="Close"
          >
            <div className="flex h-4 w-4 items-center justify-center">
              <div className="absolute h-0.5 w-3 rotate-45 bg-black"></div>
              <div className="absolute h-0.5 w-3 -rotate-45 bg-black"></div>
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
        <div className="w-full overflow-hidden rounded-lg bg-gray-200">
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
        <h2 className="mb-2 text-xl font-bold">{project.project_title}</h2>
        <p className="text-lg font-normal">{project.client}</p>
      </motion.div>

      {/* Overview Section */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <h3 className="mb-4 text-lg font-bold">Overview</h3>
        <p className="text-lg leading-6 font-normal">{project.overview}</p>
      </motion.div>

      {/* Two Column Layout for Contribution and Deliverable */}
      <motion.div
        className="mb-6 grid grid-cols-1 gap-8 lg:grid-cols-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        {/* Contribution Section */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Contribution</h3>
          <div>
            {project.contribution.map((item, index) =>
              renderBulletPoint(item, index)
            )}
          </div>
        </div>

        {/* Deliverable Section */}
        <div>
          <h3 className="mb-4 text-lg font-bold">Deliverable</h3>
          <div>
            {project.deliverables.map((item, index) =>
              renderBulletPoint(item, index + project.contribution.length)
            )}
          </div>
        </div>
      </motion.div>

      {/* Impact Section */}
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <h3 className="mb-4 text-lg font-bold">Impact</h3>
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
        <h3 className="mb-4 text-lg font-bold">Tags</h3>
        <div className="flex flex-wrap gap-3">
          {project.tags.map((tag, index) => (
            <motion.div
              key={index}
              className="rounded-xl border border-black bg-transparent px-2 pb-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2, delay: 0.4 + index * 0.05 }}
            >
              <span className="text-xs font-bold">{tag}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetailCard;
