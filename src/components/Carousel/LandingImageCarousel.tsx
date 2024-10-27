"use client";
import Image from "next/image";
import React, { useState } from "react";

type props = {
  data: any[];
};

export default function LandingImageCarousel({ data }: props) {
  const [imagesArr, setImagesArr] = useState(data);
  const handleHover = (id: any) => {
    setImagesArr(
      imagesArr.map((image: any) => {
        if (image.id == id) {
          image.hover = true;
        } else {
          image.hover = false;
        }
        return image;
      })
    );
  };

  return (
    <div className="flex justify-center px-6 animate-[appearance-in_600ms] min-h-[200px]">
      <div className="flex items-center gap-1 sm:w-[50%] md:w-[68%] lg:max-w-[1200px]">
        {imagesArr.map((item, index) => (
          <Image
            width={1000}
            height={1000}
            key={item.id}
            alt="img"
            onMouseOver={() => handleHover(item.id)}
            onMouseLeave={() => handleHover(2)}
            src={item.image}
            onLoadedMetadata={(e) => {
              console.log(e);
            }}
            className={`relative shadow-2xl  rounded-lg transition-all duration-300 ${
              item.hover
                ? "w-[45%] blur-0 shadow-red-100"
                : "w-[28%] blur-[2px]"
            } ${index == 0 ? "left-3 hover:z-[11] animate-[appearance-in_1s]" : index == 2 ? "hover:z-10 right-3 animate-[appearance-in_800ms]" : "z-10 animate-[appearance-in_800ms]"}`}
          />
        ))}
      </div>
    </div>
  );
}
