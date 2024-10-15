import Container from "@/components/Container";
import CreateBlisbell from "@/components/FormAction/CreateBlisbell";
import ListBlissBells from "@/components/ListBlissBells";
import { apiGet } from "@/lib/apiCalls";
import { getServerCookies } from "@/middleware";
import React from "react";

export default async function BlissBellsPage() {
  const auth = getServerCookies();
  const res = await apiGet(`/blissbells?$limit=20&$sort[date]=1`, auth);

  return (
    <Container className="p-3">
      <CreateBlisbell />
      <h2 className="my-3 mt-5 font-semibold my-text">
        Past and Upcoming Blissbells
      </h2>
      <ListBlissBells data={res.data} />
    </Container>
  );
}
