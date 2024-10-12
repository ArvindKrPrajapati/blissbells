import React from "react";
import { Progress, Spinner } from "@nextui-org/react";

export default function ActionLoader() {
  return (
    <div className="fixed z-100 flex justify-center items-center h-[100dvh] w-full top-0 left-0 bg-transparent gap-2">
      <Spinner size="lg" />
    </div>
  );
}
