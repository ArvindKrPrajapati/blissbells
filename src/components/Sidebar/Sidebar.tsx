"use client";

import React from "react";
import { IRoute } from "../Header/routes";
import { Accordion, AccordionItem } from "@nextui-org/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type props = {
  routes: IRoute[];
};
export default function Sidebar({ routes }: props) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <Accordion
        isCompact={true}
        className="animate-[appearance-in_400ms] md:hidden bg-red-500 mb-2"
        variant="light"
        selectedKeys={isOpen ? ["1"] : []}
        onSelectionChange={(keys: any) => setIsOpen(keys.size > 0)}
      >
        <AccordionItem
          key="1"
          title={
            <p className="text-sm font-medium text-gray-100">
              {routes.find((i) => i.route == pathname)?.name}
            </p>
          }
          indicator={
            <i className="fa-solid fa-chevron-down text-white text-xs" />
          }
          aria-label={"menu"}
          className="px-3"
        >
          {routes.map((item, index) => (
            <Link
              key={index}
              href={`${item.route}`}
              onClick={() => setIsOpen(false)}
              className={`mb-2 block px-3 py-2 text-[0.95rem] hover:bg-red-400 ${pathname == item.route ? "bg-red-400" : ""} text-zinc-100 rounded-md font-medium transition-all duration-300`}
            >
              <i className={`${item.icon} mr-2`} />
              {item.name}
            </Link>
          ))}
        </AccordionItem>
      </Accordion>
      {/* in pc */}
      <div className="w-[220px] md:mr-7 md:block hidden p-3">
        <div className="flex flex-col gap-1 fixed px-2 w-[220px]">
          {routes.map((item, index) => (
            <Link
              key={index}
              href={`${item.route}`}
              className={`px-3 py-2 text-[0.95rem] hover:bg-red-200 hover:text-red-800 ${pathname == item.route ? "bg-red-200 text-red-800" : "bg-inherit text-red-400"} rounded-md font-medium transition-all duration-300`}
            >
              <i className={`${item.icon} mr-2`} />
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
