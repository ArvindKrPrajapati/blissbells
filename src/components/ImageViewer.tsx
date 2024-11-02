"use client";
import Image from "next/image";
import React from "react";

type Props = {
  data: any[];
  onSelect?: (item: any) => void;
  selected?: any;
};
export default function ImageViewer({
  data,
  onSelect = (item: any) => {},
  selected,
}: Props) {
  return (
    <div className="columns-2 md:columns-3 gap-4 p-2 ">
      {data.map((card, index) => (
        <div
          className={`mb-4 w-full bg-gray-100 rounded-lg overflow-hidden animate-[appearance-in_600ms] cursor-pointer ${selected && selected.id == card.id ? "border-2 border-blue-400" : ""}`}
          key={card.id}
          onClick={() => {
            onSelect({ ...card, html_id: "mycard" + index });
          }}
        >
          {card.template ? (
            <div id={`mycard${index}`}>
              <div
                className="w-full h-auto"
                dangerouslySetInnerHTML={{
                  __html: card.template,
                }}
              />
            </div>
          ) : (
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
          )}
        </div>
      ))}
    </div>
  );
}
