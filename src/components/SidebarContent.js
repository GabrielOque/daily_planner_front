import { useState } from "react";
import ItemsSidebar from "@/components/ItemsSidebar";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { removeToken } from "@/utils/auth";
import { logoutUser } from "@/store/features/user/userSlice";
import CreateListModal from "@/components/CreateListModal";
import CreateTagModal from "@/components/CreateTagModal";
import { useDispatch } from "react-redux";

const SidebarContent = ({
  customLists,
  loadingLists,
  loadingTags,
  customTags,
  onClose = () => {},
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const [showAllLists, setShowAllLists] = useState(false);
  const [showAllTags, setShowAllTags] = useState(false);
  const [isOpenCreateListModal, setIsOpenCreateListModal] = useState(false);
  const [isOpenCreateTagModal, setIsOpenCreateTagModal] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    removeToken();
    router.push("/login");
  };

  const handleSettings = () => {
    router.push("/planner/settings");
  };

  const staticSidebarItems = [
    {
      label: "Proximo",
      icon: "fas fa-angle-double-right",
      redirect: "/planner/upcoming",
    },
    { label: "Tareas", icon: "fa-tasks", redirect: "/planner/all-tasks" },
    {
      label: "Calendario",
      icon: "fa-calendar-alt",
      redirect: "/planner/calendar",
    },
    { label: "Notas", icon: "fa-sticky-note", redirect: "/planner/notes" },
  ];

  const staticSidebarFooterItems = [
    {
      label: "Configuración",
      icon: "fas fa-sliders-h",
      action: handleSettings,
    },
    {
      label: "Cerrar Sesión",
      icon: "fas fa-sign-out-alt",
      action: handleLogout,
    },
  ];

  return (
    <>
      <div>
        <p className="font-bold text-textContrast text-base mt-3">TAREAS</p>
        {staticSidebarItems.map((item, idx) => (
          <ItemsSidebar
            key={idx}
            isSelected={pathname
              .split("/")
              .includes(item.redirect.split("/")[2])}
            label={item.label}
            icon={item.icon}
            onClick={() => {
              router.push(item.redirect);
              onClose();
            }}
          />
        ))}
      </div>
      <div>
        <div>
          <p className="font-bold text-textContrast text-base mt-3">LISTAS</p>
          <div className="whitespace-nowrap font-regular truncate items-center flex cursor-pointer rounded-lg px-2 gap-3 hover:bg-border hover:font-bold  py-1.5">
            <i className={`fas fa-plus text-muted text-md font-regular`} />
            <button
              className="text-textContrast text-md truncate"
              onClick={() => setIsOpenCreateListModal(true)}
            >
              Nueva Lista
            </button>
          </div>
        </div>
        {loadingLists ? (
          <div className="flex flex-row gap-2 pl-2 items-center">
            <i className="fas fa-spinner animate-spin text-muted text-md font-regular" />
          </div>
        ) : (
          <>
            {customLists
              .slice(0, showAllLists ? customLists.length : 4)
              .map((item, idx) => (
                <ItemsSidebar
                  key={idx}
                  label={item.label}
                  color={item.color}
                  isList
                  isSelected={
                    pathname.split("/").includes("tasks-list") &&
                    pathname.split("/")[3] === item.id
                  }
                  onClick={() => {
                    const redirectPath = item.redirect || "/planner/tasks-list";
                    const whitParam = `${redirectPath}/${item.id}`;
                    router.push(whitParam);
                    onClose();
                  }}
                />
              ))}
          </>
        )}
        {customLists.length > 4 && (
          <button
            className="flex items-center whitespace-nowrap font-regular cursor-pointer hover:bg-border hover:font-bold rounded-lg py-1 px-2"
            onClick={() => setShowAllLists(!showAllLists)}
          >
            {showAllLists ? (
              <div className="w-full flex items-center gap-x-2 flex-row">
                <i className="fas fa-chevron-up text-muted text-md font-regular" />
                <p className="text-textContrast text-md">Mostrar menos</p>
              </div>
            ) : (
              <div className="w-full flex items-center gap-x-2 flex-row">
                <i className="fas fa-chevron-right text-muted text-md font-regular" />
                <p className="text-textContrast text-md">Mostrar todos</p>
              </div>
            )}
          </button>
        )}
      </div>
      <div>
        <div>
          <p className="font-bold text-textContrast text-base mt-3">
            ETIQUETAS
          </p>
          <div className="whitespace-nowrap font-regular truncate items-center flex cursor-pointer rounded-lg px-2 mb-2 gap-3 hover:bg-border hover:font-bold  py-1.5">
            <i className={`fas fa-plus text-muted text-md font-regular`} />
            <button
              className="text-textContrast text-md truncate"
              onClick={() => setIsOpenCreateTagModal(true)}
            >
              Nueva Etiqueta
            </button>
          </div>
        </div>
        <div className="flex flex-row flex-wrap gap-1 pl-2">
          {loadingTags ? (
            <div className="flex flex-row gap-2 pl-2 items-center">
              <i className="fas fa-spinner animate-spin text-muted text-md font-regular" />
            </div>
          ) : (
            customTags
              .slice(0, showAllTags ? customTags.length : 4)
              .map((item, idx) => (
                <ItemsSidebar
                  key={idx}
                  label={item.label}
                  color={item.color}
                  isTag
                  isSelected={
                    pathname.split("/").includes("tasks-tag") &&
                    pathname.split("/")[3] === item.id
                  }
                  onClick={() => {
                    const redirectPath = item.redirect || "/planner/tasks-tag";
                    const whitParam = `${redirectPath}/${item.id}`;
                    router.push(whitParam);
                    onClose();
                  }}
                />
              ))
          )}
        </div>
        {customTags.length > 4 && (
          <button
            className="flex items-center whitespace-nowrap font-regular cursor-pointer hover:bg-border hover:font-bold rounded-lg py-1 px-2"
            onClick={() => setShowAllTags(!showAllTags)}
          >
            {showAllTags ? (
              <div className="w-full flex items-center gap-x-2 flex-row">
                <i className="fas fa-chevron-up text-muted text-md font-regular" />
                <p className="text-textContrast text-md">Mostrar menos</p>
              </div>
            ) : (
              <div className="w-full flex items-center gap-x-2 flex-row">
                <i className="fas fa-chevron-right text-muted text-md font-regular" />
                <p className="text-textContrast text-md">Mostrar todos</p>
              </div>
            )}
          </button>
        )}
      </div>
      <div className="flex flex-col bg-sideBar w-full mt-auto absolute md:bottom-2 bottom-0 left-0 pr-4">
        <div className="flex flex-col gap-1 pl-6">
          {staticSidebarFooterItems.map((item, idx) => (
            <ItemsSidebar
              key={idx}
              label={item.label}
              icon={item.icon}
              onClick={() => {
                item.action();
                onClose();
              }}
            />
          ))}
        </div>
      </div>
      {/* Modal for creating a new list */}
      {isOpenCreateListModal && (
        <CreateListModal onClose={() => setIsOpenCreateListModal(false)} />
      )}
      {/* Modal for creating a new tag */}
      {isOpenCreateTagModal && (
        <CreateTagModal onClose={() => setIsOpenCreateTagModal(false)} />
      )}
    </>
  );
};

export default SidebarContent;

// {customTags
//   .slice(0, showAllTags ? customTags.length : 4)
//   .map((item, idx) => (
//     <ItemsSidebar
//       key={idx}
//       label={item.label}
//       color={item.color}
//       isTag
//       onClick={() => {
//         console.log(`Se presionó etiqueta: ${item.label}`);
//         onClose();
//       }}
//     />
//   ))}
