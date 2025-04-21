import { useState } from "react";
import PillComponent from "@/components/PillComponent";

const TaskItem = ({ task }) => {
  const [showDetails, setShowDetails] = useState(false);
  return (
    <div>
      <div className="w-full flex justify-between items-center h-8">
        <p className="truncate font-semibold" title={task.title}>
          {task.title}
        </p>
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
          <div className="w-full flex gap-x-2">
            <div
              className="text-textSecondary items-center truncate"
              title={task.date}
            >
              <i className="fas fa-calendar-alt" />
              <span className="pl-2 font-semibold">{task.date}</span>
            </div>
            <PillComponent item={task.list} />
            <PillComponent item={task.tag} />
          </div>
          <div
            className="w-full flex justify-start items-center text-textSecondary truncate"
            title={task.file.name}
          >
            <i className="fas fa-link" />
            <a
              className="underline pl-2 truncate"
              href={task.file.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {task.file.name}
            </a>
          </div>
          <div className="w-full flex justify-start items-cente truncate gap-x-2 mt-2">
            <button
              className="bg-primary text-textSecondary rounded-lg px-2 py-[1px] text-sm font-semibold"
              onClick={() => console.log("click")}
            >
              Eliminar
            </button>
            <button
              className="bg-primary text-textSecondary rounded-lg px-2 py-[m] text- font-semibold"
              onClick={() => console.log("click")}
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
