"use client";

import { useState } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// types
import { ITickerImage, ITickerProps } from "@/types/interface";

const defaultImages: ITickerImage[] = [
  {
    id: "1",
    src: "/icons/peerspace.svg",
    alt: "Peerspace Logo",
  },
  {
    id: "2",
    src: "/icons/betr.svg",
    alt: "Betr Logo",
  },
  {
    id: "3",
    src: "/icons/consensys.svg",
    alt: "Consensys Logo",
  },
  {
    id: "4",
    src: "/icons/condenast.svg",
    alt: "Condé Nast Logo",
  },
  {
    id: "5",
    src: "/icons/clover.svg",
    alt: "Clover Logo",
  },
];

const Ticker: React.FC<ITickerProps> = ({
  images = defaultImages,
  autoPlay = true,
  interval = 2000,
  className = "",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Triple the images for seamless infinite marquee effect
  const extendedImages = [...images, ...images, ...images];

  const settings = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: Math.min(5, images.length),
    slidesToScroll: 1,
    autoplay: autoPlay,
    autoplaySpeed: 0,
    pauseOnHover: false,
    pauseOnFocus: false,
    pauseOnDotsHover: false,
    arrows: false,
    cssEase: "linear",
    rtl: false, // Left to right direction
    variableWidth: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(4, images.length),
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: Math.min(3, images.length),
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: Math.min(2, images.length),
        },
      },
    ],
  };

  if (images.length === 0) {
    return (
      <div
        className={`flex h-auto w-full items-center justify-center rounded-xl border border-gray-500 bg-transparent ${className}`}
      >
        <p className="text-white">No images to display</p>
      </div>
    );
  }

  return (
    <div
      className={`relative min-h-16 w-full overflow-hidden rounded-xl border border-gray-500 bg-transparent ${className} px-4`}
    >
      {/* Slick Slider Container */}
      <div className="h-16 w-full">
        <Slider {...settings}>
          {extendedImages.map((image, index) => (
            <div key={`${image.id}-${index}`} className="px-4">
              <div className="flex h-16 w-full items-center justify-center">
                <div className="relative h-12 w-24 md:h-16 md:w-32">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={128}
                    height={128}
                    className="h-full w-full object-contain transition-transform duration-300 ease-in-out hover:scale-110"
                    style={{
                      filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.1))",
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Ticker;
