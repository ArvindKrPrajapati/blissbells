"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { apiGet } from "@/lib/apiCalls";
import PageNavigation from "@/components/PageNavigation";
import CreateBlisbell from "@/app/blissbells/CreateBlisbell";
import TodaysBlissbells from "./TodaysBlissbells";
import ListItem from "./ListItem";
import { indianDate } from "@/lib/common";

export default function ListBlissBells() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const url = `/blissbells?$sort[date]=1&date[$gt]=${indianDate().format("YYYY-MM-DD")}&$limit=${limit}`;

  const _init = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiGet(`${url}&$skip=${(page - 1) * limit}`);
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
      <TodaysBlissbells loading={loading} />

      {data.length ? (
        <h2 className="my-3 mt-5 font-semibold my-text">Upcoming Blissbells</h2>
      ) : null}
      <ListItem data={data} loading={loading} refresh={_init} />
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
