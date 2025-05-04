import { useState } from "react";
import PillComponent from "@/components/PillComponent";

const statuses = {
  PENDING: "Pendiente",
  INPROGRESS: "En progreso",
  COMPLETED: "Completada",
};

const TaskItem = ({ task, onEdit, onDelete, changeStatus }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [loadingStatus, setLoadingStatus] = useState(false);
  return (
    <div className="pt-2">
      <div className="w-full flex justify-between items-center h-8">
        <div className="flex gap-x-2 taext-base text-textSecondary items-center truncate">
          <p className="truncate font-semibold text-lg" title={task.title}>
            {task.title}
          </p>
          <div className="text-textSecondary items-center flex gap-x-1 rounded-lg bg-border font-semibold px-2 py-0.5 mr-2">
            <p>{statuses[task.status]}</p>
            {task.status !== "COMPLETED" && (
              <>
                {loadingStatus ? (
                  <i className="fas fa-spinner fa-spin text-lg pl-1" />
                ) : (
                  <i
                    className="fas fa-share text-lg pl-1 border-gray-800 border-l-2 cursor-pointer"
                    onClick={() => {
                      setLoadingStatus(true);
                      changeStatus();
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
        {showDetails ? (
          <i
            className="fas fa-chevron-down cursor-pointer"
            onClick={() => setShowDetails(false)}
          />
        ) : (
          <i
            className="fas fa-chevron-right cursor-pointer"
            onClick={() => setShowDetails(true)}
          />
        )}
      </div>
      {showDetails && (
        <div className="w-full">
          <p className="truncate" title={task.description}>
            {task.description}
          </p>
          <div className="w-full flex gap-x-2 xl:flex-row xl:items-center flex-col mt-2">
            <div
              className="text-textSecondary items-center truncate"
              title={task.date}
            >
              <i className="fas fa-calendar-alt" />
              <span className="pl-2 font-semibold">{task.date}</span>
            </div>
            {task.list?._id && <PillComponent item={task.list} />}
            {task.tag?._id && <PillComponent isTag item={task.tag} />}
          </div>
          {task.file?.public_id ? (
            <div
              className="w-full flex justify-start items-center text-textSecondary truncate"
              title={task.file.secure_url}
            >
              <i className="fas fa-link" />
              <a
                className="underline pl-2 truncate"
                href={task.file.secure_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Abrir archivo
              </a>
            </div>
          ) : (
            <div className="w-full flex justify-start items-center text-textSecondary truncate">
              <i className="fas fa-link" />
              <p className="pl-2 truncate">No hay archivo</p>
            </div>
          )}
          <div className="w-full flex justify-start items-cente truncate gap-x-2 mt-2">
            <button
              className="bg-red-500 text-white rounded-lg px-2 py-[1px] text-sm font-semibold"
              onClick={onDelete}
            >
              Eliminar
            </button>
            <button
              className="bg-primary text-textSecondary rounded-lg px-2 py-[m] text- font-semibold"
              onClick={onEdit}
            >
              Editar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskItem;
