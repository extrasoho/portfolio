"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const AVATAR_URL = "/avatar.png";
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
        <div className="relative h-[200px] w-[180px] flex-shrink-0 overflow-hidden rounded-lg border border-gray-400">
          <Image
            src={AVATAR_URL}
            alt="Alejandro avatar"
            className="h-full w-full rounded-lg object-cover object-center"
            width={1024}
            height={1363}
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
                  Alejandro is a Creative Director with over eight years of
                  experience driving impactful storytelling, product innovation,
                  and design excellence for leading brands, tech startups, and
                  cultural icons. He has led multidisciplinary teams across
                  branding, product design, motion graphics, and marketing, with
                  a focus on building scalable digital experiences. Alejandro
                  founded and ran Unconfined (formerly Keithcity Group), a
                  high-output creative agency responsible for award-winning
                  campaigns, immersive content, and brand transformations for
                  major clients across entertainment, fintech, and emerging
                  technology.
                </p>
              </div>
              {showMore && (
                <div className="flex flex-col justify-between gap-4">
                  <>
                    <p className="text-sm text-white">
                      His work spans across notable companies and ventures,
                      including leading front-end design and brand development
                      at Betr, shaping the user experience for platforms like
                      Clover, Eterna, Dorado, and Voomio, and creating standout
                      creative for global brands like Bombay Sapphire, HBO’s
                      Insecure, and Ethereum Merge NFTs. Alejandro’s work has
                      been featured in mainstream media and industry outlets,
                      including Forbes, Adweek, Hypebeast, and Complex,
                      reflecting his ability to deliver cultural impact through
                      innovative design and storytelling.
                    </p>
                    <p className="text-sm text-white">
                      With a strong foundation in architecture and design,
                      Alejandro combines a meticulous eye for detail with a
                      forward-thinking approach to product and brand strategy.
                      Beyond his agency and product roles, he has collaborated
                      with startups to develop go-to-market strategies, UX
                      systems, and creative positioning that drive growth. A
                      passionate horology enthusiast and admirer of vintage
                      Porsche 911s, Alejandro brings both precision and artistry
                      to every project he leads.
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
