"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

export default function LogoutButton() {
  const router = useRouter();
  const logout = () => {
    document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    toast.success("Logged out successfully");
    router.replace("/");
    router.refresh();
  };
  return (
    <Button
      radius="sm"
      variant="flat"
      color="danger"
      className="w-full"
      onClick={logout}
    >
      Logout
    </Button>
  );
}
