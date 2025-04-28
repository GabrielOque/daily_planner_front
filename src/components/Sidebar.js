import { useState } from "react";
import SidebarContent from "@/components/SidebarContent";

const customLists = [
  {
    label: "Personales 2025 peoyecto de grados",
    color: "blue",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f2",
  },
  {
    label: "Universidad noveno°",
    color: "yellow",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f3",
  },
  {
    label: "Trabajo",
    color: "purple",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f4",
  },
  {
    label: "Lista 3",
    color: "orange",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f5",
  },
  {
    label: "Lista 4",
    color: "pink",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f6",
  },
  {
    label: "Lista 5",
    color: "teal",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f7",
  },
  {
    label: "Lista 6",
    color: "red",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f8",
  },
  {
    label: "Lista 7",
    color: "purple",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f9",
  },
  {
    label: "Lista 8",
    color: "gray",
    redirect: "/planner/tasks",
    id: "68028acef0f1a7a90a7173f10",
  },
];

const customTags = [
  { label: "Personal", color: "blue" },
  { label: "Trabajo", color: "red" },
  { label: "Lista 1", color: "yellow" },
  { label: "Equipo", color: "blue" },
  { label: "Yo", color: "red" },
  { label: "Ejemplo", color: "yellow" },
  { label: "Personal", color: "blue" },
  {
    label: "Trabajo yo lo deseo hacer en casa sin i a la oficjna mañana",
    color: "red",
  },
  { label: "Lista 1", color: "yellow" },
  { label: "Equipo", color: "blue" },
  { label: "Yo", color: "red" },
  { label: "Ejemplo", color: "yellow" },
];

const Sidebar = () => {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <>
      <div className="w-1/4 lg:w-1/5 2xl:w-1/6 md:block hidden overflow-hidden h-full rounded-2xl bg-sideBar py-2 pl-4 pr-2 relative">
        <h1 className="lg:pl-2 pl-0 text-2xl font-bold text-textContrast cursor-pointer">
          Daily Planner
        </h1>

        <div className="flex-col gap-4 mt-6 lg:pl-4 pl-0 pr-2 overflow-y-auto scroll-custom overflow-x-hidden h-[calc(100%-140px)]">
          <SidebarContent customLists={customLists} customTags={customTags} />
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
            <h1 className="font-bold text-2xl pl-2 text-textContrast">
              Daily planner
            </h1>
            <div className="flex-col mt-6 overflow-y-auto overflow-x-hidden h-[calc(100%-140px)]">
              <SidebarContent
                customLists={customLists}
                customTags={customTags}
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
