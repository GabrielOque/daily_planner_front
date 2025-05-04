import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import SidebarContent from "@/components/SidebarContent";
import { getTags } from "@/store/features/tag/tagThunks";
import { getLists } from "@/store/features/list/listThunks";

const Sidebar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const { lists, isLoading } = useSelector((state) => state.lists);
  const { tags, isLoading: loadingTags } = useSelector((state) => state.tags);
  const { user } = useSelector((state) => state.userAuth);

  useEffect(() => {
    dispatch(getLists());
    dispatch(getTags());
  }, []);

  return (
    <>
      <div className="w-1/4 lg:w-1/5 2xl:w-1/6 md:block hidden overflow-hidden h-full rounded-2xl bg-sideBar py-2 pl-4 pr-2 relative">
        <div className="lg:pl-2 pl-0 text-2xl font-bold text-textContrast cursor-pointer flex items-center">
          <img
            src={user?.image?.secure_url || "/defaultprofile.svg"}
            alt="logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <button
            className="text-textContrast font-bold text-2xl pl-2 truncate"
            onClick={() => router.push("/planner")}
          >
            {user.name}
          </button>
        </div>

        <div className="flex-col gap-4 mt-6 lg:pl-4 pl-0 pr-2 overflow-y-auto scroll-custom overflow-x-hidden h-[calc(100%-140px)]">
          <SidebarContent
            customLists={lists}
            loadingLists={isLoading}
            loadingTags={loadingTags}
            customTags={tags}
          />
        </div>
      </div>

      {/* mobile sidebar */}
      <div className="w-full md:hidden flex justify-between h-16 bg-sideBar p-2 relative items-center">
        <p className="font-bold text-2xl pl-2 text-textContrast">
          Daily planner
        </p>
        {displaySidebar ? (
          <i
            className="fas fa-times text-2xl font-semibold text-textContrast pr-2"
            onClick={() => setDisplaySidebar(false)}
          />
        ) : (
          <i
            onClick={() => setDisplaySidebar(true)}
            className="fas fa-bars text-2xl font-semibold text-textContrast pr-2"
          />
        )}
      </div>
      {displaySidebar && (
        <div
          className="md:w-1/2 w-2/3 h-full fixed left-0 bg-sideBar z-50 px-4 py-2"
          style={{
            boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="w-full h-full relative">
            <div className="font-bold text-2xl pl-2 text-textContrast flex items-center">
              <img
                src={user?.image?.secure_url || "/defaultprofile.svg"}
                alt="logo"
                className="w-10 h-10 rounded-full object-cover"
              />
              <button
                className="text-textContrast font-bold text-2xl pl-2 truncate"
                onClick={() => router.push("/planner")}
              >
                {user.name}
              </button>
            </div>
            <div className="flex-col mt-6 overflow-y-auto overflow-x-hidden h-[calc(100%-140px)]">
              <SidebarContent
                customLists={lists}
                loadingLists={isLoading}
                loadingTags={loadingTags}
                customTags={tags}
                onClose={() => setDisplaySidebar(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
