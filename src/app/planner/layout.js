"use client";
import Sidebar from "@/components/Sidebar";
export default function Planner({ children }) {
  return (
    <div className="h-screen flex flex-col w-full">
      <div className="w-full h-full flex justify-between p-8 gap-x-4">
        <Sidebar />
        <div className="w-3/4 2xl:w-4/5 h-full border border-sideBar rounded-2xl p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
