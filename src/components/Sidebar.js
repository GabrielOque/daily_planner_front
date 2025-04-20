import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeToken } from "@/app/utils/auth";
import { logoutUser } from "@/app/store/features/user/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="w-1/4 2xl:w-1/5 h-full rounded-2xl bg-sideBar p-4">
      <h1
        className="text-2xl font-bold text-neutral"
        onClick={() => {
          dispatch(logoutUser());
          removeToken();
          router.push("/login");
        }}
      >
        Daily Planner Gab
      </h1>
    </div>
  );
};

export default Sidebar;
