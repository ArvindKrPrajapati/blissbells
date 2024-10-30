"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import ButtonContainer from "./ButtonContainer";
import { getAuthCookie } from "@/lib/apiCalls";
import ClientOnly from "./ClientOnly";

export default function LandingCTA({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const auth = getAuthCookie();
  const handleClick = () => {
    router.push(auth ? "/blissbells" : `${pathname}?auth=true`);
  };
  return (
    <ClientOnly>
      <ButtonContainer className={className} onClick={handleClick}>
        {auth ? (
          <p className="flex h-full items-center gap-3">
            <i className="fa-solid fa-calendar"></i>
            Create Blissbells
          </p>
        ) : (
          "Send Blissbells"
        )}
      </ButtonContainer>
    </ClientOnly>
  );
}
