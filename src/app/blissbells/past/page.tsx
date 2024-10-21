import Container from "@/components/Container";
import React from "react";
import ListBlissBells from "../ListBlissBells";

export default function PastBlissBellsPage() {
  return (
    <Container className="p-3">
      <ListBlissBells past={true} />
    </Container>
  );
}
