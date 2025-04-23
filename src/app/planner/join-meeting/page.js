"use client";
import {
  ControlBar,
  GridLayout,
  ParticipantTile,
  RoomAudioRenderer,
  useTracks,
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

        // Habilitar la cámara y micrófono del usuario local
        const localParticipant = room?.localParticipant;
        if (!localParticipant?.isCameraEnabled)
          localParticipant?.setCameraEnabled(true);
        if (!localParticipant?.isMicrophoneEnabled)
          localParticipant?.setMicrophoneEnabled(true);

        // Suscribirse a los participantes que se conecten
        const handleParticipantConnected = (participant) => {
          console.log("Participant", participant);
          participant?.tracks?.forEach((track) => {
            if (track?.kind === "video" || track?.kind === "audio") {
              track?.subscribe(); // Suscribirse a los tracks de video y audio de otros participantes
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
        <MyVideoConference />
        <RoomAudioRenderer />
        <ControlBar />
      </div>
    </RoomContext.Provider>
  );
}

function MyVideoConference() {
  const room = useContext(RoomContext); // Obtener la instancia del Room desde el contexto
  const tracks = useTracks(
    [
      { source: Track?.Source?.Camera, withPlaceholder: true },
      { source: Track?.Source?.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  useEffect(() => {
    if (room) {
      // Suscribirse a los participantes ya presentes en la sala
      room?.participants?.forEach((participant) => {
        participant?.tracks?.forEach((track) => {
          if (track?.kind === "video" || track?.kind === "audio") {
            track?.subscribe(); // Asegurarse de estar suscrito a los tracks
          }
        });
      });
    }
  }, [room]);

  return (
    <GridLayout tracks={tracks} style={{ height: "80vh" }}>
      <ParticipantTile />
    </GridLayout>
  );
}
