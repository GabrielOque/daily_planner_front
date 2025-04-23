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
import { useEffect, useState } from "react";
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

        room.on("disconnected", () => {
          router.push("/planner/calendar");
        });

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
  }, [roomName, userName]);

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
  const tracks = useTracks(
    [
      { source: Track.Source.Camera, withPlaceholder: true },
      { source: Track.Source.ScreenShare, withPlaceholder: false },
    ],
    { onlySubscribed: false }
  );

  return (
    <GridLayout tracks={tracks} style={{ height: "80vh" }}>
      <ParticipantTile />
    </GridLayout>
  );
}
