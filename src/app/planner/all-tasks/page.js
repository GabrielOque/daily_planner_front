"use client";
import axios from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
import FilterTasksWrapper from "@/components/FilterTasksWrapper";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllTasks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/task/get-all-tasks`
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <div>
      <FilterTasksWrapper
        tasks={tasks}
        getTasks={getAllTasks}
        loading={loading}
        title="Todas las tareas"
      />
    </div>
  );
};

export default Tasks;
