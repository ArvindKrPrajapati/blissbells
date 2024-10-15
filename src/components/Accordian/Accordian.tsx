"use client";
import React, { useEffect, useRef, useState } from "react";
type props = {
  title: React.ReactNode;
  children: React.ReactNode;
};
export default function Accordion({ title, children }: props) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<any>(null);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.style.maxHeight = isOpen
        ? `${contentRef.current.scrollHeight}px`
        : "0px";
    }
  }, [isOpen]);
  return (
    <div className="border border-red-200 rounded-md overflow-hidden">
      <button
        className="w-full p-4 text-left bg-red-50 hover:bg-red-100 transition-colors duration-300 flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <i
          className={`fa-solid fa-chevron-down text-red-500 transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      <div
        ref={contentRef}
        className="bg-white overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: "0px" }}
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
