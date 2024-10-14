"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ButtonContainer from "./ButtonContainer";
import { getAuthCookie } from "@/lib/apiCalls";

export default function LandingCTA({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuthCookie();
  const handleClick = () => {
    router.push(auth ? "/blissbells" : `${pathname}?auth=true`);
  };
  return (
    <ButtonContainer className={className} onClick={handleClick}>
      {auth ? "Create Blissbells" : "Start Remembering"}
    </ButtonContainer>
  );
}
