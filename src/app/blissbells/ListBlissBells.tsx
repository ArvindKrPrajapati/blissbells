"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiGet } from "@/lib/apiCalls";
import PageNavigation from "@/components/PageNavigation";
import CreateBlisbell from "@/app/blissbells/CreateBlisbell";
import ListBlissbelltem from "./ListBlissBellsItem";
import { indianDate } from "@/lib/common";
import Link from "next/link";
import Image from "next/image";
import TodaysBlissbells from "./TodaysBlissbells";
import PageTitle from "@/components/PageTitle";

export default function ListBlissBells({ past = false }: { past?: boolean }) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [noDataFound, setNoDataFound] = useState(false);
  const url = `/blissbells?$sort[date]=1&date[$${past ? "lt" : "gt"}]=${indianDate().format("YYYY-MM-DD")}&$limit=${limit}`;

  const _init = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiGet(`${url}&$skip=${(page - 1) * limit}`);
      if (past) {
        setNoDataFound(res.data.length === 0);
      }
      setData(res.data);
      setTotal(res.total);
      setSkip(res.skip);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    _init(1);
  }, []);

  return (
    <>
      <CreateBlisbell refresh={_init} />
      {past ? null : (
        <>
          <TodaysBlissbells loading={loading} setNoDataFound={setNoDataFound} />
        </>
      )}
      <br />
      {data.length ? (
        <PageTitle title={`${past ? "Past" : "Upcoming"} Blissbells`} />
      ) : null}

      {loading == false && noDataFound && data.length == 0 ? (
        <div className="flex justify-center items-center">
          <div>
            <Image
              width={1000}
              height={1000}
              alt="no-data"
              src={"/images/extra/no-data.png"}
              className="w-[400px]"
            />
            <p className="text-center font-semibold text-xl -mt-14">
              No{past ? " Past" : ""} Blissbells Found
            </p>
            <p className="text-center">
              <Link
                href={`/blissbells${past ? "" : "/past"}`}
                className="my-text text-sm"
              >
                {past ? null : <i className="fa-solid fa-history text-xs" />}
                <span> View {past ? "Upcoming" : "Past"} Blissbells</span>
              </Link>
            </p>
          </div>
        </div>
      ) : null}

      <ListBlissbelltem
        data={data}
        loading={loading}
        refresh={_init}
        showCreateButton={!past}
      />
      <br />
      <br />
      {total > limit ? (
        <PageNavigation
          total={total}
          limit={limit}
          skip={skip}
          onChange={_init}
          loading={loading}
        />
      ) : null}
    </>
  );
}
