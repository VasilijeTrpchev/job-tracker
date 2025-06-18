import React from "react";
import Navbar from "../components/Navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="p-4 bg-gradient-to-b from-[#2B7FFF]/90 to-white rounded-4xl">
        {children}
      </div>
    </>
  );
}
