"use client";
import React from "react";
import { Accordion, AccordionItem, Avatar } from "@nextui-org/react";
import { indianDate } from "@/lib/common";
type props = {
  data: any[];
};
export default function ListBlissBells({ data }: props) {
  return (
    <Accordion>
      {data.map((item: any, index: number) => (
        <AccordionItem
          key={index}
          aria-label={item.name}
          startContent={
            <Avatar
              isBordered
              className="bg-white"
              radius="lg"
              src="/images/user.png"
            />
          }
          subtitle={
            <p>
              {item.name} on{" "}
              <span>{indianDate(item.date).format("DD MMM YYYY")}</span>
            </p>
          }
          title={<p className="capitalize font-semibold">{item.event}</p>}
        >
          {item.description || "No Description"}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
