"use client";
import React, { useEffect, useState } from "react";
import { Button, Pagination } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ThresholdReached from "./ThresholdReached";
type props = {
  total: number;
  limit: number;
  skip: number;
  loading?: boolean;
  onChange?: (page: number) => void;
};
export default function PageNavigation({
  total,
  limit,
  skip,
  onChange = (page) => {},
  loading = false,
}: props) {
  const router = useRouter();
  const [reachedBottom, setReachedBottom] = useState(false);
  const totalPages = Math.ceil(total / limit);
  const currentPage = skip / limit + 1;
  return (
    <>
      <div className="py-2 px-2 flex flex-col md:flex-row justify-between items-center sticky bottom-[10px]">
        <span
          className={`md:w-[30%] pb-3 text-small text-default-950  font-semibold ${
            reachedBottom ? "visible" : "invisible"
          }`}
        >
          {skip + 1} to {limit + skip > total ? total : limit + skip} of {total}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="danger"
          page={currentPage}
          total={totalPages}
          onChange={onChange}
          isDisabled={loading}
          classNames={{
            item: "bg-zinc-100",
            next: "bg-zinc-100",
            prev: "bg-zinc-100",
          }}
        />
        <div
          className={`hidden sm:flex w-[30%] justify-end gap-2 ${
            reachedBottom ? "visible" : "invisible"
          }`}
        >
          <Button
            isDisabled={currentPage === 1 || loading}
            size="sm"
            variant="flat"
            color="danger"
            onClick={() => onChange(currentPage - 1)}
          >
            Previous
          </Button>
          <Button
            isDisabled={currentPage == totalPages || loading}
            size="sm"
            variant="flat"
            color="danger"
            onClick={() => onChange(currentPage + 1)}
            disabled={loading}
          >
            Next
          </Button>
        </div>
      </div>
      <ThresholdReached
        onIntersect={() => {
          setReachedBottom(true);
        }}
        onExit={() => {
          setReachedBottom(false);
        }}
      />
    </>
  );
}
