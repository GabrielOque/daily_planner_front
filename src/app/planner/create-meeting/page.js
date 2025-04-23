"use client";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
export default function CreateMeeting() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const createMeeting = async () => {
    try {
      const res = await axios.post(
        `${NEXT_PUBLIC_API_URL}/user/create-meeting`,
        {
          roomName: `room-${Math.floor(Math.random() * 10000)}`,
          userName: "anfitrion",
        }
      );

      setUrl(res.data.url);
      router.push(res.data.url);
    } catch (err) {
      console.error("Error al crear la reunión:", err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold">Crear Reunión</h1>
      <button
        className="px-4 py-2 bg-blue-500  rounded mt-4"
        onClick={createMeeting}
      >
        Unirse a la reunión
      </button>
    </div>
  );
}
