import { Progress } from "@nextui-org/react";
import React from "react";

export default function Loading() {
  return (
    <Progress
      size="sm"
      isIndeterminate
      aria-label="Loading..."
      className="fixed top-0 w-full left-0"
      style={{ zIndex: 1000 }}
    />
  );
}
