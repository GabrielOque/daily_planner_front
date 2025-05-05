"use client";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import ProtectedRoutes from "@/components/ProtectedRoutes";
import FloatingMeeting from "@/components/FloatingMeeting";

export default function Planner({ children }) {
  const pathname = usePathname();
  const { isMeeting } = useSelector((state) => state.userAuth);

  return (
    <ProtectedRoutes>
      <div className="h-screen w-full flex flex-col overflow-hidden">
        <div
          className={`flex flex-col md:flex-row w-full h-full  gap-y-2 md:gap-x-4 ${
            isMeeting ? "p-0" : "p-0 md:p-2 lg:p-4 2xl:p-8"
          }`}
        >
          {!isMeeting && <Sidebar />}
          <div
            className={` h-full  scrollbar-hidden overflow-y-scroll ${
              isMeeting
                ? "w-full p-0"
                : pathname === "/planner"
                ? "p-0 w-full md:w-3/4 2xl:w-4/5 md:border md:border-sideBar md:rounded-2xl"
                : "p-2 md:p-4 w-full md:w-3/4 2xl:w-4/5 md:border md:border-sideBar md:rounded-2xl"
            }`}
          >
            {children}
            <FloatingMeeting />
          </div>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
