"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PressCard: React.FC = () => {
  return (
    <div className="flex w-full flex-col gap-4 rounded-xl border border-gray-500 bg-transparent p-4 backdrop-blur-lg">
      <div className="flex flex-col gap-4">
        {/* Press Button - Using shadcn/ui Button */}
        <div className="w-full">
          <Button
            variant="secondary"
            size="sm"
            className="h-[22px] w-[82px] cursor-pointer rounded-full border border-gray-500 bg-transparent text-xs font-bold tracking-wide text-white uppercase hover:bg-transparent"
          >
            Press
          </Button>
        </div>

        {/* Press Outlets Row */}
        <div className="flex justify-between gap-4">
          {/* Adweek Button */}
          <Button
            variant="outline"
            className="flex h-9 w-full items-center justify-center rounded-lg border border-gray-500 bg-transparent hover:bg-transparent"
            onClick={() =>
              window.open(
                "https://www.adweek.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <Image
              src="/icons/adweek.svg"
              alt="Adweek"
              width={73}
              height={22}
              className="max-h-full max-w-full object-contain"
            />
          </Button>

          {/* Deadline Button */}
          <Button
            variant="outline"
            className="flex h-9 w-full items-center justify-center rounded-lg border border-gray-500 bg-transparent hover:bg-transparent"
            onClick={() =>
              window.open(
                "https://deadline.com/",
                "_blank",
                "noopener,noreferrer"
              )
            }
          >
            <Image
              src="/icons/deadline.svg"
              alt="Deadline"
              width={90}
              height={9}
              className="max-h-full max-w-full object-contain"
            />
          </Button>

          {/* Adage Button */}
          <Button
            variant="outline"
            className="flex h-9 w-full items-center justify-center rounded-lg border border-gray-500 bg-transparent hover:bg-transparent"
            onClick={() =>
              window.open("https://adage.com/", "_blank", "noopener,noreferrer")
            }
          >
            <Image
              src="/icons/adage.svg"
              alt="Adage"
              width={76}
              height={26}
              className="max-h-full max-w-full object-contain"
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PressCard;
