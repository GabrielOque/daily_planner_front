"use client";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import axios from "@/utils/axiosInstance";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

//Components
import TaskItem from "@/components/TaskItem";
import DataNotFound from "@/components/DataNotFound";
import ConfirmationModal from "@/components/ConfirmationModal";
import CreateAndEditTask from "@/components/CreateAndEditTask";
import CreateItemComponent from "@/components/CreateItemComponent";

const Upcoming = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [createNewTask, setCreateNewTask] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const [todayTasks, setTodayTasks] = useState([]);
  const [tomorrowTasks, setTomorrowTasks] = useState([]);
  const [weekTasks, setWeekTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const getTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/task/get-tasks-by-week`
      );
      setLoading(false);
      setTodayTasks(response.data.today);
      setTomorrowTasks(response.data.tomorrow);
      setWeekTasks(response.data.week);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

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

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <div className="w-full">
        <div className="w-full flex items-center mb-4">
          <h1 className="text-2xl md:text-4xl font-bold text-neutral">
            Upcoming
          </h1>
          <div className="border border-sideBar rounded-lg h-10 md:h-12 flex items-center justify-center ml-2 md:ml-4 md:px-4 px-2 text-xl font-bold">
            {[...todayTasks, ...tomorrowTasks, ...weekTasks].length}
          </div>
        </div>
        <div className="border border-sideBar rounded-lg p-3 h-full">
          <p className="text-md md:text-xl font-bold text-neutral pb-4">Hoy</p>
          <CreateItemComponent onClick={() => setCreateNewTask(true)}>
            Agregar nueva tarea
          </CreateItemComponent>
          {loading ? (
            <div className="w-full flex justify-center items-center h-[100px]">
              <i className="fas fa-spinner fa-spin text-3xl text-gray-500" />
            </div>
          ) : (
            <div>
              {todayTasks.length === 0 && (
                <DataNotFound paddingY={"pt-6"} text="No hay tareas para hoy" />
              )}
              {todayTasks.length > 0 && (
                <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
                  {todayTasks.map((task, index) => (
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
        <div className="w-full flex xl:flex-row flex-col md:gap-x-4 gap-y-4 mt-4 items-start">
          <div className="border border-sideBar rounded-lg p-3 xl:w-1/2 w-full">
            <p className="text-md md:text-xl font-bold text-neutral pb-4">
              Mañana
            </p>
            <CreateItemComponent onClick={() => setCreateNewTask(true)}>
              Agregar nueva tarea
            </CreateItemComponent>
            {loading ? (
              <div className="w-full flex justify-center items-center h-[100px]">
                <i className="fas fa-spinner fa-spin text-3xl text-gray-500" />
              </div>
            ) : (
              <div>
                {tomorrowTasks.length === 0 && (
                  <DataNotFound
                    paddingY={"pt-6"}
                    text="No hay tareas para mañana"
                  />
                )}
                {tomorrowTasks.length > 0 && (
                  <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
                    {tomorrowTasks.map((task, index) => (
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
          <div className=" border border-sideBar rounded-lg p-3 xl:w-1/2 w-full">
            <p className="text-md md:text-xl font-bold text-neutral pb-4">
              Esta semana
            </p>
            <CreateItemComponent onClick={() => setCreateNewTask(true)}>
              Agregar nueva tarea
            </CreateItemComponent>
            {loading ? (
              <div className="w-full flex justify-center items-center h-[100px]">
                <i className="fas fa-spinner fa-spin text-3xl text-gray-500" />
              </div>
            ) : (
              <div>
                {weekTasks.length === 0 && (
                  <DataNotFound
                    paddingY={"pt-6"}
                    text="No hay tareas para esta semana"
                  />
                )}
                {weekTasks.length > 0 && (
                  <div className="w-full flex flex-col gap-y-4 px-4 mt-2 divide-y-2 scroll-custom overflow-y-auto max-h-[400px] min-h-[100px]">
                    {weekTasks.map((task, index) => (
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

export default Upcoming;
