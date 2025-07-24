"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeFilter: string;
  onFilterChange: (filterTag: string) => void;
}

const Header = ({ activeFilter, onFilterChange }: HeaderProps) => {
  const filters = [
    { name: "All", tag: "all", color: "bg-[#A97FF7]", textColor: "text-black" },
    {
      name: "Brand",
      tag: "brand",
      color: "bg-[#F57E07]",
      textColor: "text-black",
    },
    {
      name: "UX/UI",
      tag: "ux/ui",
      color: "bg-[#A7DC73]",
      textColor: "text-black",
    },
    {
      name: "Strategy",
      tag: "strategy",
      color: "bg-[#F0D20E]",
      textColor: "text-black",
    },
    {
      name: "Go to Market",
      tag: "go-to-market",
      color: "bg-[#70CCC4]",
      textColor: "text-black",
    },
  ];

  return (
    <div className="z-10 flex h-14 min-h-14 w-full gap-4 overflow-auto rounded-xl border border-black bg-[#F9F1E4] p-4 shadow-[3px_3px_0px_0px_rgb(0,0,0)] lg:sticky lg:top-0">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          onClick={() => onFilterChange(filter.tag)}
          variant="outline"
          size="sm"
          className={`h-[22px] rounded-full border border-black px-4 text-xs font-bold tracking-tight transition-all duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none ${filter.color} ${filter.textColor} ${activeFilter === filter.tag ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800" : ""} `}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default Header;
