"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AVATAR_URL =
  "https://framerusercontent.com/images/h4yrqkRp6ih6BZPFsW14dvuuUY.jpg";
const LINKEDIN_URL = "https://www.linkedin.com/in/corpusalejandro/";
const LINKEDIN_ICON =
  "https://framerusercontent.com/images/v1oDmx8nFhj76TRSggWAfeLPzFs.svg";

export default function ProfileCard() {
  return (
    <div className="flex h-full w-full flex-col gap-4 rounded-xl border border-gray-500 bg-transparent p-4">
      {/* Top: Avatar and Name/Title */}
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative h-[180px] w-[180px] flex-shrink-0 overflow-hidden rounded-lg border border-gray-500">
          <Image
            src={AVATAR_URL}
            alt="Alejandro avatar"
            className="h-full w-full rounded-lg object-cover object-center"
            width={180}
            height={180}
          />
        </div>

        {/* LinkedIn Button */}
        {/* Name and Title */}
        <div className="flex h-full w-full flex-col justify-between">
          <Button
            variant="outline"
            className="ml-auto flex cursor-pointer items-center justify-center rounded-lg border border-gray-500 bg-transparent p-2 transition hover:bg-transparent"
            aria-label="LinkedIn"
            onClick={() =>
              window.open(LINKEDIN_URL, "_blank", "noopener,noreferrer")
            }
          >
            <Image
              src={LINKEDIN_ICON}
              alt="LinkedIn"
              width={23}
              height={23}
              className="h-full w-full object-cover object-center"
            />
          </Button>
          <div className="flex flex-col gap-1">
            <span className="text-[22px] leading-tight font-bold text-white">
              Alejandro
            </span>
            <span className="text-md font-normal text-white">
              Creative Director
            </span>
          </div>
        </div>
      </div>
      {/* Description */}
      <p className="text-xs leading-snug text-white">
        Creative Director with over 8+ years of experience leading
        multidisciplinary teams across branding, product design, marketing and
        emerging technology. Recognized for driving impactful storytelling and
        digital innovation through recognized creative leadership. Built and led
        a high-output agency responsible for campaigns, animation and content
        for major cultural figures and technology partners.
      </p>
    </div>
  );
}
