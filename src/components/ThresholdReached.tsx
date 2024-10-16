"use client";
import React, { useEffect, useRef } from "react";

type Props = {
  onIntersect: () => void;
  onExit?: () => void; // Optional callback for when the intersection is over
};

export default function ThresholdReached({ onIntersect, onExit }: Props) {
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        onIntersect();
      } else if (onExit) {
        onExit();
      }
    }, options);

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [onIntersect, onExit]);

  return <main ref={sentinelRef} />;
}
