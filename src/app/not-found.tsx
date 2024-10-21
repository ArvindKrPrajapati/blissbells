import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex justify-center items-center text-2xl min-h-[80vh] font-bold h-full">
      <div className="text-center md:flex items-center gap-4">
        <Image
          width={1000}
          height={1000}
          alt="not found"
          className="md:w-[500px] w-[300px]"
          src={"/images/extra/not-found.png"}
        />
        <div>
          404 | Content Not Found
          <br />
          <Link href="/" className="my-text text-sm font-semibold">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
