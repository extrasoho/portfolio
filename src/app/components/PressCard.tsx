"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const PressCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex w-full flex-col rounded-xl border border-gray-400 bg-transparent p-4 backdrop-blur-lg">
      {/* Header with title and toggle button */}
      <div className="flex items-center justify-between">
        <label className="text-[22px] font-bold text-white">Press</label>

        <Button
          variant="outline"
          size="icon"
          className="h-6 w-6 rounded-full border border-gray-400 bg-transparent text-white hover:bg-transparent"
          onClick={toggleOpen}
          aria-label={isOpen ? "Close" : "Open"}
        >
          {isOpen ? "−" : "+"}
        </Button>
      </div>

      {/* Animated collapsible content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: [0.04, 0.62, 0.23, 0.98],
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="flex flex-col gap-4 pt-4"
            >
              {/* Press Outlets Row */}
              <div className="flex justify-between gap-4">
                {/* Adweek Button */}
                <Button
                  variant="outline"
                  className="flex h-9 w-full items-center justify-center rounded-lg border border-gray-400 bg-transparent hover:bg-transparent"
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
                  className="flex h-9 w-full items-center justify-center rounded-lg border border-gray-400 bg-transparent hover:bg-transparent"
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
                  className="flex h-9 w-full items-center justify-center rounded-lg border border-gray-400 bg-transparent hover:bg-transparent"
                  onClick={() =>
                    window.open(
                      "https://adage.com/",
                      "_blank",
                      "noopener,noreferrer"
                    )
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PressCard;
