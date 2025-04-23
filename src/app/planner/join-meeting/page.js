"use client";
import {
  formatChatMessageLinks,
  VideoConference,
  RoomAudioRenderer,
  RoomContext,
} from "@livekit/components-react";
import { Room, Track } from "livekit-client";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import {
  NEXT_PUBLIC_LIVEKIT_URL,
  NEXT_PUBLIC_API_URL,
} from "@/utils/envConfig";
import { useRouter } from "next/navigation";
import "@livekit/components-styles";

export default function JoinMeeting() {
  const router = useRouter();
  const roomName = new URLSearchParams(window.location.search).get("roomName");
  const userName = new URLSearchParams(window.location.search).get("userName");

  const [roomInstance, setRoomInstance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let currentRoom = null;

    const joinRoom = async () => {
      try {
        const res = await axios.post(
          `${NEXT_PUBLIC_API_URL}/user/join-meeting`,
          {
            roomName,
            userName,
          }
        );
        const { token } = res.data;

        if (!mounted || !token) return;

        const room = new Room({
          adaptiveStream: true,
          dynacast: true,
        });

        await room.connect(NEXT_PUBLIC_LIVEKIT_URL, token);

        const localParticipant = room?.localParticipant;
        if (!localParticipant?.isCameraEnabled)
          localParticipant?.setCameraEnabled(true);
        if (!localParticipant?.isMicrophoneEnabled)
          localParticipant?.setMicrophoneEnabled(true);

        const handleParticipantConnected = (participant) => {
          console.log("Participant", participant);
          participant?.tracks?.forEach((track) => {
            if (track?.kind === "video" || track?.kind === "audio") {
              track?.subscribe();
            }
          });
        };

        const handleParticipantDisconnected = (participant) => {
          router.push("/planner/calendar");
          console.log(`${participant?.identity || ""} se desconectó`);
        };

        room.on("participantConnected", handleParticipantConnected);
        room.on("disconnected", handleParticipantDisconnected);

        currentRoom = room;
        setRoomInstance(room);
      } catch (err) {
        console.error("Error al conectarse:", err);
      } finally {
        setLoading(false);
      }
    };

    joinRoom();

    return () => {
      mounted = false;
      currentRoom?.disconnect();
    };
  }, [roomName, userName, router]);

  if (loading) return <div>Conectando...</div>;
  if (!roomInstance) return <div>Esperando la conexión...</div>;

  return (
    <RoomContext.Provider value={roomInstance}>
      <div
        data-lk-theme="default"
        style={{ height: "88vh", overflowX: "hidden", overflowY: "hidden" }}
      >
        <MyVideoConference chatMessageFormatter={formatChatMessageLinks} />
        <RoomAudioRenderer />
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  return (
    <div className="h-[88vh] overflow-hidden rounded-2xl bg-neutral">
      <VideoConference
        chatMessageInputProps={{ placeholder: "Escribe un mensaje..." }}
      />
    </div>
  );
}
