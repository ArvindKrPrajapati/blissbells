import PageTitle from "@/components/PageTitle";
import React from "react";
import { cardsData } from "./data";
import ImageViewer from "@/components/ImageViewer";

export default function CardsPage() {
  return (
    <div>
      <PageTitle title="Blissbell Cards" />

      <ImageViewer data={cardsData} />
    </div>
  );
}
