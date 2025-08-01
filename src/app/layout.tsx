import type { Metadata } from "next";
import "./globals.css";

import ToastProvider from "@/components/ToastProvider";
import MainLoader from "@/components/MainLoder";

export const metadata: Metadata = {
  title: "Phys-Ed Admin",
  description: "Phys-Ed",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-[#2c2c2e]`}>
        {false ? <MainLoader /> : children}
        <ToastProvider />
      </body>
    </html>
  );
}
