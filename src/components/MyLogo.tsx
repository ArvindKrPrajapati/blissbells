"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MyLogo() {
  return (
    <Link href="/" className="flex items-center gap-1">
      <Image
        width={1000}
        height={1000}
        className="h-[30px] w-[30px]"
        src={"/images/only-logo.png"}
        alt="Logo"
      />
      <div>
        <h2 className="my-text">Blissbells</h2>
        <h4 className="text-[0.6rem] text-gray-600 -mt-1">Never Forgets</h4>
      </div>
    </Link>
  );
}
