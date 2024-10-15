import Container from "@/components/Container";
import CreateBlisbell from "@/components/FormAction/CreateBlisbell";
import { apiGet } from "@/lib/apiCalls";
import { getServerCookies } from "@/middleware";
import React from "react";

export default async function BlissBellsPage() {
  const auth = getServerCookies();
  const res = await apiGet(`/blissbells?$limit=20&$sort[date]=1`, auth);
  return (
    <Container className="p-3">
      <CreateBlisbell />
      <div className="p-4">
        {res.data.map((item: any, index: number) => (
          <div key={index} className="mb-2">
            {index + 1} | {item.event} | {item.date}
          </div>
        ))}
      </div>
    </Container>
  );
}
