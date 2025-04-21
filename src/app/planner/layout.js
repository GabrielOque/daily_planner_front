"use client";
import Sidebar from "@/components/Sidebar";
import ProtectedRoutes from "@/components/ProtectedRoutes";

export default function Planner({ children }) {
  return (
    <ProtectedRoutes>
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <div className="flex flex-col md:flex-row w-full h-full p-0 md:p-2 lg:p-4 2xl:p-8 gap-y-2 md:gap-x-4">
          <Sidebar />
          <div className="w-full md:w-3/4 2xl:w-4/5 h-full md:border md:border-sideBar md:rounded-2xl p-2 md:p-4 scrollbar-hidden overflow-y-scroll">
            {children}
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
