"use client";
import React from "react";

type props = {
  total?: number;
};
export default function BlissBellsSkeleton({ total = 5 }: props) {
  return (
    <>
      {Array(total)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className="flex gap-3 bg-gray-200 mb-4 rounded-md p-2 px-4 animate-pulse items-center"
          >
            <div className="w-[50px] aspect-square bg-gray-300 rounded-full animate-pulse" />
            <div className="w-full">
              <div className="w-[80%] h-[15px] bg-gray-300 mb-2" />
              <div className="w-[40%] h-[15px] bg-gray-300" />
            </div>
            <i className="fa-solid fa-chevron-left text-gray-400 animate-pulse" />
          </div>
        ))}
    </>
  );
}
