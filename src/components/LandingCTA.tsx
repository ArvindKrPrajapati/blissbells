"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ButtonContainer from "./ButtonContainer";

export default function LandingCTA({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    router.push(`${pathname}?auth=true`);
  };
  return (
    <ButtonContainer className={className} onClick={handleClick}>
      Start Remembering
    </ButtonContainer>
  );
}
