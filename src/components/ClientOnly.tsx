"use client";
import React, { useState, useEffect } from "react";

export default function ClientOnly({ children }: any) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (typeof window != "undefined") {
      setMounted(true);
    }
  }, []);
  if (mounted) {
    return <>{children}</>;
  }
  return null;
}
