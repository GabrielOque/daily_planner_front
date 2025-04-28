"use client";
import { useParams } from "next/navigation";

const page = () => {
  const { listId } = useParams();
  return <div>Task by list {listId}</div>;
};

export default page;
