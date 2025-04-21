import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeToken } from "@/utils/auth";
import { logoutUser } from "@/store/features/user/userSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [displaySidebar, setDisplaySidebar] = useState(false);
  return (
    <>
      <div className="w-1/4 md:block hidden 2xl:w-1/5 h-full rounded-2xl bg-sideBar p-4">
        <h1
          className="text-2xl font-bold text-neutral"
          onClick={() => {
            dispatch(logoutUser());
            removeToken();
            router.push("/login");
          }}
        >
          Daily Planner
        </h1>
      </div>
      <div className="w-full md:hidden flex justify-between h-16 bg-sideBar p-2 relative items-center">
        <p className="font-bold text-xl">Daily planner</p>
        {displaySidebar ? (
          <i
            className="fas fa-times text-xl font-semibold"
            onClick={() => setDisplaySidebar(false)}
          />
        ) : (
          <i
            onClick={() => setDisplaySidebar(true)}
            className="fas fa-bars text-xl font-semibold"
          />
        )}
      </div>
      {displaySidebar && (
        <div className="w-64 h-full fixed left-0 bg-[#8C8C8C] z-50"></div>
      )}
    </>
  );
};

export default Sidebar;
