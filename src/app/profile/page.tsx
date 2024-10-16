"use client";
import ButtonContainer from "@/components/ButtonContainer";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();
  const handleLogout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.replace("/");
    toast.success("Logged out successfully");
  };
  return (
    <div className="h-[60vh] flex justify-center items-center">
      <ButtonContainer onClick={handleLogout}>Logout</ButtonContainer>
    </div>
  );
}
