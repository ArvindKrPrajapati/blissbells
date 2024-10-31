"use client";
import Image from "next/image";
import React from "react";

type Props = {
  data: any[];
};
export default function ImageViewer({ data }: Props) {
  return (
    <div className="columns-2 md:columns-3 gap-4 p-2">
      {data.map((card) => (
        <div
          className="mb-4 w-full bg-gray-100 rounded-lg overflow-hidden"
          key={card.id}
        >
          <Image
            src={card.image}
            alt="Card"
            width={1000}
            height={1000}
            className="w-full h-auto rounded-lg animate-pulse"
            loading="lazy"
            onLoad={(e) => e.currentTarget.classList.remove("animate-pulse")}
            onError={(e) => e.currentTarget.classList.remove("animate-pulse")}
          />
        </div>
      ))}
    </div>
  );
}
