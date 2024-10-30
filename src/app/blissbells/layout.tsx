import Container from "@/components/Container";
import { IRoute } from "@/components/Header/routes";
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blissbells",
  description: "Never Forgets",
};

const routes: IRoute[] = [
  {
    id: 1,
    name: "Upcoming Blisbells",
    route: "/blissbells",
    icon: "fa-solid fa-bell",
  },
  {
    id: 2,
    name: "Past Blissbells",
    route: "/blissbells/past",
    icon: "fa-solid fa-history",
  },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100dvh-60px)] bg-gray-50">
      <Container className="md:flex gap-8">
        <Sidebar routes={routes} />
        <div className="w-full p-3">{children}</div>
      </Container>
    </div>
  );
}
