import { useState } from "react";
//Components
import { colors } from "@/utils/colors";
import TaskItem from "@/components/TaskItem";
import DataNotFound from "@/components/DataNotFound";
import CustomInput from "@/components/CustomInput";
import CreateItemComponent from "@/components/CreateItemComponent";
import ConfirmationModal from "@/components/ConfirmationModal";
import CreateAndEditTask from "@/components/CreateAndEditTask";
import { toast } from "react-toastify";
import axios from "@/utils/axiosInstance";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

const FilterTasksWrapper = ({
  parent,
  tasks,
  isTag,
  getTasks,
  loading,
  title = "",
}) => {
  const [search, setSearch] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

  const handleDataToEdit = (task) => {
    const newTask = {
      date: task.date,
      description: task.description,
      file: task.file?.secure_url,
      list: {
        id: task.list?._id,
        label: task.list?.label,
        color: task.list?.color,
      },
      tag: {
        id: task.tag?._id,
        label: task.tag?.label,
        color: task.tag?.color,
      },
      title: task.title,
      id: task._id,
    };
    setSelectedTask(newTask);
  };

  const deleteTask = async () => {
    setLoadingDelete(true);
    try {
      await axios.delete(
        `${NEXT_PUBLIC_API_URL}/task/delete-task/${deleteTaskId}`
      );
      toast.success("Tarea eliminada con éxito");
      setLoadingDelete(false);
      setShowDeleteModal(false);
      setDeleteTaskId(null);
      getTasks();
    } catch (error) {
      toast.error("Error al eliminar la tarea, intenta nuevamente");
      setLoadingDelete(false);
      console.log(error);
    }
  };

  const changeStatus = async (taskId) => {
    try {
      await axios.put(`${NEXT_PUBLIC_API_URL}/task/change-status/${taskId}`);
      toast.success("Estado de la tarea actualizado con éxito");
      getTasks();
    } catch (error) {
      toast.error(
        "Error al actualizar el estado de la tarea, intenta nuevamente"
      );
      console.log(error);
    }
  };

  return (
    <>
      <div className="w-full">
        <div className="w-full flex items-center mb-4">
          {title ? (
            <p className="text-textSecondary text-2xl font-semibold pl-3">
              {title}
            </p>
          ) : (
            <div>
              {!isTag ? (
                <div className="flex items-center">
                  <i
                    className={`fas fa-folder text-4xl rounded-sm`}
                    style={{ color: colors[parent.color] }}
                  />
                  <p className="text-textSecondary text-2xl font-semibold pl-3">
                    {parent.label}
                  </p>
                </div>
              ) : (
                <div className="flex items-center">
                  <div
                    className={`text-white text-sm  px-2 py-1 rounded-md`}
                    style={{
                      backgroundColor: colors[parent.color],
                    }}
                  >
                    {parent.label}
                  </div>
                </div>
              )}
            </div>
          )}
          <div className="border border-sideBar rounded-lg h-10 md:h-12 flex items-center justify-center ml-2 md:ml-4 md:px-4 px-2 text-xl font-bold">
            {tasks.length}
          </div>
        </div>
        <div className="border border-sideBar rounded-lg p-3 h-full">
          <div className="flex md:flex-row flex-col md:items-center  mb-4 md:gap-x-2 gap-y-2">
            <div className="w-full md:w-1/2 xl:w-1/3">
              <CustomInput
                height="h-10"
                placeholder="Buscar tarea"
                border="border-gray-300"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/2 xl:w-2/3">
              <CreateItemComponent onClick={() => setCreateNewTask(true)}>
                Agregar nueva tarea
              </CreateItemComponent>
            </div>
          </div>
          {loading ? (
            <div className="w-full flex justify-center items-center h-32">
              <i className="fas fa-spinner fa-spin text-3xl text-gray-500" />
            </div>
          ) : (
            <div>
              {tasks.length === 0 && (
                <DataNotFound paddingY={"pt-6"} text="No hay tareas" />
              )}
              {tasks.length > 0 && (
                <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
                  {tasks
                    .filter((task) =>
                      task.title.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((task, index) => (
                      <TaskItem
                        key={index}
                        task={task}
                        onDelete={() => {
                          setDeleteTaskId(task._id);
                          setShowDeleteModal(true);
                        }}
                        onEdit={() => handleDataToEdit(task)}
                        changeStatus={() => changeStatus(task._id)}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      {/* Modal for create new task */}
      {createNewTask && (
        <CreateAndEditTask
          onClose={() => setCreateNewTask(false)}
          selectedTask={null}
          getTasks={getTasks}
        />
      )}
      {/* Modal for edit task */}
      {showDeleteModal && (
        <ConfirmationModal
          onClose={() => {
            setDeleteTaskId(null);
            setShowDeleteModal(false);
          }}
          title="Eliminar tarea"
          description="¿Estás seguro de que deseas eliminar esta tarea?"
          loading={loadingDelete}
          onConfirm={deleteTask}
        />
      )}
      {/* Modal for edit task */}
      {selectedTask && (
        <CreateAndEditTask
          onClose={() => {
            setSelectedTask(null);
          }}
          selectedTask={selectedTask}
          getTasks={getTasks}
        />
      )}
    </>
  );
};

export default FilterTasksWrapper;
