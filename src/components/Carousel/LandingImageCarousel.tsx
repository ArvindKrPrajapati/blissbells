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
    <>
      {imagesArr.map((item, index) => (
        <Image
          width={1000}
          height={100}
          key={item.id}
          alt="img"
          onMouseOver={() => handleHover(item.id)}
          onMouseLeave={() => handleHover(2)}
          src={item.image}
          className={`relative shadow-2xl  rounded-lg transition-all duration-300 ${
            item.hover ? "w-[45%] blur-0 shadow-red-100" : "w-[28%] blur-[2px]"
          } ${index == 0 ? "left-3 hover:z-[11]" : index == 2 ? "hover:z-10 right-3" : "z-10"}`}
        />
      ))}
    </>
  );
}
