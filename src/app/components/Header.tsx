"use client";

import { Button } from "@/components/ui/button";

interface HeaderProps {
  activeFilter: string;
  onFilterChange: (filterTag: string) => void;
}

const Header = ({ activeFilter, onFilterChange }: HeaderProps) => {
  const filters = [
    {
      name: "All",
      tag: "all",
      color: "bg-transparent",
      textColor: "text-white",
    },
    {
      name: "Brand",
      tag: "brand",
      color: "bg-transparent",
      textColor: "text-white",
    },
    {
      name: "UX/UI",
      tag: "ux/ui",
      color: "bg-transparent",
      textColor: "text-white",
    },
    {
      name: "Strategy",
      tag: "strategy",
      color: "bg-transparent",
      textColor: "text-white",
    },
    {
      name: "Go to Market",
      tag: "go-to-market",
      color: "bg-transparent",
      textColor: "text-white",
    },
  ];

  return (
    <div className="z-10 flex h-14 min-h-14 w-full gap-4 overflow-auto rounded-xl border border-gray-500 bg-transparent p-4 backdrop-blur-lg lg:sticky lg:top-0">
      {filters.map((filter) => (
        <Button
          key={filter.name}
          onClick={() => onFilterChange(filter.tag)}
          variant="outline"
          size="sm"
          className={`h-[22px] rounded-full border border-gray-500 px-4 text-xs font-bold tracking-tight transition-all duration-200 ease-in-out hover:scale-105 focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:outline-none ${filter.color} ${filter.textColor} ${activeFilter === filter.tag ? "ring-2 ring-white ring-offset-2 ring-offset-gray-800" : ""} `}
        >
          {filter.name}
        </Button>
      ))}
    </div>
  );
};

export default Header;
