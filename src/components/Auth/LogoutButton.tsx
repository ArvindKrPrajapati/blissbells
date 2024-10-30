"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";
import ButtonContainer from "../ButtonContainer";

export default function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logged out successfully");
    router.replace("/");
    router.refresh();
  };
  return (
    <div className="animate-[appearance-in_1200ms]">
      <ButtonContainer onClick={logout} className="w-full rounded-md text-sm">
        Logout
      </ButtonContainer>
    </div>
  );
}
