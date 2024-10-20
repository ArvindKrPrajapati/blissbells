"use client";
import { apiGet } from "@/lib/apiCalls";
import { indianDate } from "@/lib/common";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ListItem from "./ListItem";

export default function TodaysBlissbells({ loading }: { loading: boolean }) {
  const [data, setData] = useState([]);

  const getTodayBlissbells = async (page?: number) => {
    try {
      const res = await apiGet(
        `/blissbells?$limit=500&date=${indianDate().format("YYYY-MM-DD")}`
      );
      setData(res.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    if (loading) {
      getTodayBlissbells();
    }
  }, [loading]);
  if (!data.length) {
    return null;
  }

  return (
    <div className="my-3 mt-5 rounded-md overflow-hidden bg-white shadow-md">
      <div className="flex">
        <div className="flex w-[100px] min-h-[105px] items-center justify-center bg-red-900">
          <i className="fa-solid fa-bell text-2xl text-red-500" />
        </div>
        <div className="p-3 bg-red-800 w-full flex items-center">
          <div>
            <p className="text-xs text-red-300 mb-1">
              {indianDate().format("DD MMM YYYY")}
            </p>
            <h1 className="text-lg text-red-200">{"Today's Blissbells"}</h1>
            <p className="text-sm text-red-400">
              Make this day special for your friends and family. Send them well
              wishesh now.
            </p>
          </div>
        </div>
      </div>
      <div className="p-3">
        <ListItem data={data} refresh={getTodayBlissbells} loading={loading} />
      </div>
    </div>
  );
}
