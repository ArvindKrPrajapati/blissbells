"use client";
import Image from "next/image";
import React from "react";

export default function UserDetailsCard({ data }: { data: any }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 w-full mx-auto">
      <div className="flex items-center gap-6">
        <div className="h-[100px] w-[100px] border-2 border-red-300 p-1 rounded-md cursor-pointer">
          <Image
            src={data.dp || "/images/user.png"}
            alt="user"
            width={1000}
            height={1000}
            className="rounded-md w-full h-full"
          />
        </div>

        <div className="w-[calc(100%-125px)]">
          <div>
            <p className="font-medium text-xl line-clamp-2">{data.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="line-clamp-2">{data.email}</p>
            <i className="fa-solid fa-check-circle text-green-700 text-sm mt-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
