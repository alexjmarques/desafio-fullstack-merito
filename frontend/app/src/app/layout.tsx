import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Funds Manager",
  description: "Gerencie seus fundos de investimento",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-500 h-screen w-screen flex justify-center items-center`}
      >
        <div className="flex flex-col container mx-auto w-3/4 h-full max-h-9/12 bg-white rounded-2xl shadow-lg overflow-hidden">
          <Navbar />
          <main className="mx-auto w-full p-6 h-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
