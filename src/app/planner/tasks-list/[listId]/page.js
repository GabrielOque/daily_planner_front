"use client";
import axios from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
import FilterTasksWrapper from "@/components/FilterTasksWrapper";

const Tasks = () => {
  const { listId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState({});

  const getTasksByListId = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/task/get-tasks-by-list/${listId}`
      );
      setTasks(response.data?.tasks);
      setList(response.data?.list);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksByListId();
  }, []);

  return (
    <div>
      <FilterTasksWrapper
        parent={list}
        tasks={tasks}
        getTasks={getTasksByListId}
        loading={loading}
      />
    </div>
  );
};

export default Tasks;
