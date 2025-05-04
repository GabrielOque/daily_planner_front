"use client";
import axios from "@/utils/axiosInstance";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
import FilterTasksWrapper from "@/components/FilterTasksWrapper";

const Tasks = () => {
  const { tagId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tag, setTag] = useState({});

  const getTasksByTagId = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${NEXT_PUBLIC_API_URL}/task/get-tasks-by-tag/${tagId}`
      );
      setTasks(response.data?.tasks);
      setTag(response.data?.tag);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasksByTagId();
  }, []);

  return (
    <div>
      <FilterTasksWrapper
        isTag
        parent={tag}
        tasks={tasks}
        getTasks={getTasksByTagId}
        loading={loading}
      />
    </div>
  );
};

export default Tasks;
