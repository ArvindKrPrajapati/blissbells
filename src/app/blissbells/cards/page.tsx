"use client";
import PageTitle from "@/components/PageTitle";
import React from "react";
import PaginatedList from "@/components/PaginatedList";
import ImageViewer from "@/components/ImageViewer";

export default function CardsPage() {
  return (
    <div>
      <PageTitle title="Blissbell Cards" />

      <PaginatedList
        url="/card-template"
        maxPerPage={10}
        render={(data) => <ImageViewer data={data} />}
      />
    </div>
  );
}
