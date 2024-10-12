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
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
      <body className={`antialiased`}>
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
