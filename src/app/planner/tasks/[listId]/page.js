"use client";
import { useParams } from "next/navigation";

const Tasks = () => {
  const { listId } = useParams();
  return <div>Task by list {listId}</div>;
};

export default Tasks;
