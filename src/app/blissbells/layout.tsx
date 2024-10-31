import Container from "@/components/Container";
import { IRoute, routes } from "@/components/Header/routes";
import Sidebar from "@/components/Sidebar/Sidebar";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blissbells",
  description: "Never Forgets",
};

const blissBellsRoutes: IRoute[] =
  routes.find((i) => i.route == "/blissbells")?.children || [];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100dvh-60px)] bg-gray-50">
      <Container className="md:flex gap-8">
        <Sidebar routes={blissBellsRoutes} />
        <div className="w-full p-3">{children}</div>
      </Container>
    </div>
  );
}
