import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { removeToken } from "@/utils/auth";
import { logoutUser } from "@/store/features/user/userSlice";
import ItemsSidebar from "@/components/ItemsSidebar";

const sidebarSections = [
  {
    title: "TAREAS",
    items: [
      { text: "Proximo", icon: "fa-chevron-double-right" },
      { text: "Hoy", icon: "fa-tasks" },
      { text: "Calendario", icon: "fa-calendar-alt" },
      { text: "Notas", icon: "fa-sticky-note" },
    ],
  },
  {
    title: "LISTAS",
    items: [
      { text: "Agregar Nueva Lista", icon: "fas fa-plus" },
      { text: "Personal", list: "#FE7979" },
      { text: "Trabajo", list: "#66D9E8" },
      { text: "Lista 1", list: "#FFD43B" },
      { text: "Lista 2", list: "#FFD43B" },
      { text: "Lista 3", list: "#FFD43B" },
      { text: "Lista 4", list: "#FFD43B" },
      { text: "Lista 5", list: "#FFD43B" },
      { text: "Lista 6", list: "#FFD43B" },
      { text: "Lista 7", list: "#FFD43B" },
      { text: "Lista 8", list: "#FFD43B" },
    ],
  },
  {
    title: "ETIQUETAS",
    items: [
      { text: "Personal", color: "#FE7979" },
      { text: "Trabajo", color: "#66D9E8" },
      { text: "Lista 1", color: "#FFD43B" },
      { text: "Equipo", color: "#FE7979" },
      { text: "Yo", color: "#66D9E8" },
      { text: "Ejemplo", color: "#FFD43B" },
      { text: "Agregar Etiqueta", icon: "fas fa-plus", color: "#EBEBEB" },
    ],
  },
];

const Sidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [displaySidebar, setDisplaySidebar] = useState(false);
  const [showAllLists, setShowAllLists] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    removeToken();
    router.push("/login");
  };

  const sidebarFooterItems = [
    { text: "Configuración", icon: "fas fa-sliders-h" },
    {
      text: "Cerrar Sesión",
      icon: "fas fa-sign-out-alt",
      onClick: handleLogout,
    },
  ];

  return (
    <>
      <div className="w-1/4 lg:w-1/5 2xl:w-1/6 md:block hidden overflow-hidden h-full rounded-2xl bg-sideBar p-4 relative">
        <h1 className="lg:pl-2 pl-0 text-2xl font-bold text-textContrast cursor-pointer">
          Daily Planner
        </h1>

        <div className="flex-col gap-4 mt-6 lg:pl-4 pl-0 overflow-y-auto overflow-x-hidden h-[calc(100%-120px)]">
          {sidebarSections.map((section, index) => (
            <div key={index} className="gap-2 flex flex-col">
              <p className="font-bold text-textContrast text-base mt-3">
                {section.title}
              </p>
              <div
                className={`flex ${
                  section.title === "ETIQUETAS"
                    ? "flex-row flex-wrap"
                    : "flex-col"
                } gap-1 pl-2`}
              >
                {section.items
                  .slice(
                    0,
                    section.title === "LISTAS" && !showAllLists
                      ? 6
                      : section.items.length
                  )
                  .map((item, idx) => (
                    <ItemsSidebar
                      key={idx}
                      text={item.text}
                      icon={item.icon}
                      list={item.list}
                      color={item.color}
                      onClick={item.onClick}
                    />
                  ))}
                {section.title === "LISTAS" && section.items.length > 6 && (
                  <button
                    className="flex items-center gap-4 whitespace-nowrap font-regular cursor-pointer hover:bg-border hover:font-bold rounded-lg p-3"
                    onClick={() => setShowAllLists(!showAllLists)}
                  >
                    {showAllLists ? (
                      <div className="w-full flex items-center gap-5 flex-row">
                        <i className="fas fa-chevron-up text-muted text-xl font-regular" />
                        <p className="text-textContrast text-xl">
                          Mostrar Menos
                        </p>
                      </div>
                    ) : (
                      <div className="w-full flex items-center gap-5 flex-row">
                        <i className="fas fa-chevron-down text-muted text-xl font-regular" />
                        <p className="text-textContrast text-xl">Mostrar Más</p>
                      </div>
                    )}
                  </button>
                )}
              </div>
              <div className="w-full h-0.5 bg-border"></div>
            </div>
          ))}
        </div>

        <div className="flex flex-col bg-sideBar w-full mt-auto absolute bottom-0 left-0 pr-4">
          <div className="flex flex-col gap-1 pl-6">
            {sidebarFooterItems.map((item, idx) => (
              <ItemsSidebar
                key={idx}
                text={item.text}
                icon={item.icon}
                onClick={item.onClick}
              />
            ))}
          </div>
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
          className="md:w-1/2 w-2/3 h-full fixed left-0 bg-sideBar z-50 p-4"
          style={{
            boxShadow: "4px 0px 8px rgba(0, 0, 0, 0.10)",
          }}
        >
          <div className="w-full h-full relative">
            <h1 className="font-bold text-2xl pl-2 text-textContrast">
              Daily planner
            </h1>
            <div className="flex-col gap-4 mt-6 overflow-y-auto overflow-x-hidden h-[calc(100%-120px)]">
              {sidebarSections.map((section, index) => (
                <div key={index} className="gap-2 flex flex-col">
                  <p className="font-bold text-textContrast text-base mt-3">
                    {section.title}
                  </p>
                  <div
                    className={`flex ${
                      section.title === "ETIQUETAS"
                        ? "flex-row flex-wrap"
                        : "flex-col"
                    } gap-1 pl-2`}
                  >
                    {section.items
                      .slice(
                        0,
                        section.title === "LISTAS" && !showAllLists
                          ? 6
                          : section.items.length
                      )
                      .map((item, idx) => (
                        <ItemsSidebar
                          key={idx}
                          text={item.text}
                          icon={item.icon}
                          list={item.list}
                          color={item.color}
                          onClick={item.onClick}
                        />
                      ))}
                    {section.title === "LISTAS" && section.items.length > 6 && (
                      <button
                        className="flex items-center gap-4 whitespace-nowrap font-regular cursor-pointer hover:bg-border hover:font-bold rounded-lg p-3"
                        onClick={() => setShowAllLists(!showAllLists)}
                      >
                        {showAllLists ? (
                          <div className="w-full flex items-center gap-5 flex-row">
                            <i className="fas fa-chevron-up text-muted text-xl font-regular" />
                            <p className="text-textContrast text-xl">
                              Mostrar Menos
                            </p>
                          </div>
                        ) : (
                          <div className="w-full flex items-center gap-5 flex-row">
                            <i className="fas fa-chevron-down text-muted text-xl font-regular" />
                            <p className="text-textContrast text-xl">
                              Mostrar Más
                            </p>
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                  <div className="w-full h-0.5 bg-border"></div>
                </div>
              ))}
            </div>
            <div className="flex flex-col bg-sideBar w-full mt-auto absolute bottom-0 left-0 pr-4">
              <div className="flex flex-col gap-1 pl-3">
                {sidebarFooterItems.map((item, idx) => (
                  <ItemsSidebar
                    key={idx}
                    text={item.text}
                    icon={item.icon}
                    onClick={item.onClick}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
