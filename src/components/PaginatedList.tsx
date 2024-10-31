"use client";
import { apiGet } from "@/lib/apiCalls";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageNavigation from "./PageNavigation";
import ActionLoader from "./ActionLoader";
type Props = {
  url: string;
  render: (data: any) => React.ReactNode;
  maxPerPage?: number;
};

export default function PaginatedList({ url, maxPerPage = 5, render }: Props) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(maxPerPage);
  const [total, setTotal] = useState(0);

  const getUrl = `${url}${url.includes("?") ? "&" : "?"}$limit=${limit}`;

  const _init = async (page: number) => {
    try {
      setLoading(true);
      const res = await apiGet(`${getUrl}&$skip=${(page - 1) * limit}`);
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

  if (loading) {
    return <ActionLoader isFixed={false} />;
  }
  return (
    <>
      {render(data)}
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
