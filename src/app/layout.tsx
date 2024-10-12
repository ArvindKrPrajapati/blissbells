import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Blissbells",
  description: "Never Forgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />

        {children}
        <Toaster />
      </body>
    </html>
  );
}
