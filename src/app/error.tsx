"use client"; // Error components must be Client Components

import ButtonContainer from "@/components/ButtonContainer";
import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import { useEffect } from "react";

export const metadata: Metadata = {
  title: "Error",
  description: "An error occured",
};

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error({ msg: error.message });
  }, [error]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white">
      <div className="p-8 ">
        <h1 className="text-6xl font-bold mb-4">Oops!</h1>
        <p>Something went wrong. Please try again later.</p>
        <ButtonContainer
          onClick={() => reset()}
          className="mt-4 rounded-md text-sm"
        >
          Try again
        </ButtonContainer>
      </div>
    </div>
  );
}
