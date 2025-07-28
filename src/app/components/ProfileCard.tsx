"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AVATAR_URL = "/avatar.jpg";
const LINKEDIN_URL = "https://www.linkedin.com/in/corpusalejandro/";
const LINKEDIN_ICON = "/icons/linkedin.svg";

export default function ProfileCard() {
  const [showMore, setShowMore] = useState(false);

  // Define skills/tags array
  const skills = [
    "Creative Director",
    "Product Design",
    "Brand Strategy",
    "Digital Innovation",
    "Team Leadership",
  ];

  return (
    <div className="flex w-full flex-1 flex-col gap-4 rounded-xl border border-gray-400 bg-transparent p-4 backdrop-blur-lg lg:min-h-0">
      {/* Top: Avatar and Name/Title */}
      <div className="flex flex-shrink-0 items-start gap-4">
        {/* Avatar */}
        <div className="relative h-[180px] w-[180px] flex-shrink-0 overflow-hidden rounded-lg border border-gray-400">
          <Image
            src={AVATAR_URL}
            alt="Alejandro avatar"
            className="h-full w-full rounded-lg object-cover object-center"
            width={779}
            height={1008}
          />
        </div>

        {/* LinkedIn Button */}
        {/* Name and Title */}
        <div className="flex h-full w-full flex-col justify-between">
          <Button
            variant="outline"
            className="ml-auto flex cursor-pointer items-center justify-center rounded-lg border border-gray-400 bg-transparent p-2 transition hover:bg-transparent"
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
        </div>
      </div>
      {/* Description */}
      <div className="flex min-h-0 flex-1 flex-col gap-4">
        <div className="scrollbar-hide flex-1 overflow-auto">
          <div className="flex h-full flex-col justify-between gap-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-[22px] font-bold text-white">
                  Alejandro
                </span>
                <span className="text-md font-normal text-white">
                  Creative Director
                </span>
                <p className="text-sm text-white">
                  Creative Director with over 8+ years of experience leading
                  multidisciplinary teams across branding, product design,
                  marketing and emerging technology. Recognized for driving
                  impactful storytelling and digital innovation through
                  recognized creative leadership. Built and led a high-output
                  agency responsible for campaigns, animation and content for
                  major cultural figures and technology partners.
                </p>
              </div>
              {showMore && (
                <div className="flex flex-col justify-between gap-4">
                  <>
                    <p className="text-sm text-white">
                      Creative Director with over 8+ years of experience leading
                      multidisciplinary teams across branding, product design,
                      marketing and emerging technology. Recognized for driving
                      impactful storytelling and digital innovation through
                      recognized creative leadership. Built and led a
                      high-output agency responsible for campaigns, animation
                      and content for major cultural figures and technology
                      partners.
                    </p>
                    <p className="text-sm text-white">
                      Creative Director with over 8+ years of experience leading
                      multidisciplinary teams across branding, product design,
                      marketing and emerging technology. Recognized for driving
                      impactful storytelling and digital innovation through
                      recognized creative leadership. Built and led a
                      high-output agency responsible for campaigns, animation
                      and content for major cultural figures and technology
                      partners.
                    </p>
                  </>
                  <div className="flex flex-wrap gap-3">
                    {(() => {
                      const skillElements = [];
                      for (let i = 0; i < skills.length; i++) {
                        skillElements.push(
                          <div
                            key={i}
                            className="rounded-xl border border-gray-400 bg-transparent px-2 pb-1"
                          >
                            <span className="text-xs font-bold text-white">
                              {skills[i]}
                            </span>
                          </div>
                        );
                      }
                      return skillElements;
                    })()}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="outline"
          className="w-full rounded-lg border border-gray-400 bg-transparent text-white transition-colors hover:border-white hover:bg-transparent"
          onClick={() => setShowMore(!showMore)}
        >
          {showMore ? "Show Less" : "Show More"}
        </Button>
      </div>
    </div>
  );
}
