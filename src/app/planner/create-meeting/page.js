"use client";
import { useState } from "react";
import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";
export default function CreateMeeting() {
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
    } catch (err) {
      console.error("Error al crear la reunión:", err);
    }
  };

  return (
    <div>
      <h1>Crear Reunión</h1>
      <button onClick={createMeeting}>Crear</button>
      {url && (
        <p>
          Link de invitación: <a href={url}>{url}</a>
        </p>
      )}
    </div>
  );
}
