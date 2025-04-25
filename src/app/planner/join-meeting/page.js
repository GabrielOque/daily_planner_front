"use client";
import Button from "@/components/Button";
import {
  formatChatMessageLinks,
  VideoConference,
  RoomAudioRenderer,
  RoomContext,
} from "@livekit/components-react";
import { Room } from "livekit-client";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  NEXT_PUBLIC_LIVEKIT_URL,
  NEXT_PUBLIC_API_URL,
} from "@/utils/envConfig";
import { useRouter } from "next/navigation";
import "@livekit/components-styles";

export default function JoinMeeting() {
  const router = useRouter();
  const [confirmed, setConfirmed] = useState(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    let stream;

    const enableCamera = async () => {
      if (isCameraEnabled && videoRef.current) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
        } catch (err) {
          console.error("No se pudo acceder a la cámara", err);
        }
      } else if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isCameraEnabled]);

  return (
    <>
      {!confirmed ? (
        <div className="flex flex-col items-center justify-center h-full px-2 bg-gray-100">
          <h1 className="text-2xl md:text-4xl font-bold mb-4">
            Unirse a la reunión
          </h1>
          <div className="justify-center w-4/5 h-[200px] md:w-3/5 md:h-3/5 rounded-xl mt-4 flex items-center bg-neutral overflow-hidden">
            {isCameraEnabled ? (
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center flex-col relative">
                <p className="text-sideBar text-sm font-regular absolute top-4">
                  La cámara está desactivada
                </p>
                <i className="fad fa-webcam-slash text-textPrimary text-3xl" />
              </div>
            )}
          </div>
          <div className="pt-4 flex gap-x-4 w-40 justify-between">
            <span
              className="w-14 h-10 flex justify-center items-center rounded-xl transition-transform duration-200 cursor-pointer border-2 border-gray-300 text-neutral overflow-hidden"
              onClick={() => setIsMicrophoneEnabled(!isMicrophoneEnabled)}
            >
              <i
                className={`w-full h-full text-center pt-2 text-xl fad ${
                  isMicrophoneEnabled
                    ? "fa-microphone "
                    : "fa-microphone-slash bg-red-700 text-textPrimary"
                } text-2xl`}
              />
            </span>

            <span
              className="w-14 h-10 flex justify-center items-center rounded-xl transition-transform duration-200 cursor-pointer border-2 border-gray-300 text-neutral overflow-hidden"
              onClick={() => setIsCameraEnabled(!isCameraEnabled)}
            >
              <i
                className={`w-full h-full text-center pt-2 text-xl fad ${
                  isCameraEnabled
                    ? "fa-video"
                    : "fa-video-slash bg-red-700 text-textPrimary"
                } text-2xl`}
              />
            </span>
          </div>

          <div className="flex justify-center gap-x-4 w-80 pt-4">
            <Button
              paddingY="py-2"
              paddingX="px-2"
              background="bg-white"
              border="border-2 border-gray-300"
              fontSize="text-sm md:text-md"
              textColor="text-neutral"
              onClick={() => {
                setIsCameraEnabled(false);
                router.push("/planner/calendar");
              }}
            >
              Cancelar
            </Button>

            <Button
              paddingY="py-1"
              paddingX="px-2"
              background="bg-primary"
              fontSize="text-sm md:text-md"
              textColor="text-neutral"
              onClick={() => {
                setConfirmed(true);
              }}
            >
              Unirse ahora
            </Button>
          </div>
        </div>
      ) : (
        <JoinConfirmed
          isMicrophoneEnabled={isMicrophoneEnabled}
          isCameraEnabled={isCameraEnabled}
        />
      )}
    </>
  );
}

const JoinConfirmed = ({ isMicrophoneEnabled, isCameraEnabled }) => {
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

        // const localParticipant = room?.localParticipant;
        // if (!localParticipant?.isCameraEnabled)
        //   localParticipant?.setCameraEnabled(true);
        // if (!localParticipant?.isMicrophoneEnabled)
        //   localParticipant?.setMicrophoneEnabled(true);

        if (isCameraEnabled) {
          room.localParticipant.setCameraEnabled(true);
        }
        if (isMicrophoneEnabled) {
          room.localParticipant.setMicrophoneEnabled(true);
        }

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

  if (loading) return <Connecting title={"Conectando a la reunión..."} />;
  if (!roomInstance)
    return <Connecting title={"Esperando a los participantes..."} />;

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
};

function MyVideoConference() {
  return (
    <div className="h-[88vh] overflow-hidden rounded-2xl bg-neutral">
      <VideoConference
        chatMessageInputProps={{ placeholder: "Escribe un mensaje..." }}
      />
    </div>
  );
}

const Connecting = ({ title }) => {
  return (
    <div className="flex items-center justify-center h-full animate-pulse">
      <div className="flex items-center justify-center w-10 h-10 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
      <div className="loader"></div>
      <p className="text-gray-500 pl-3">{title}</p>
    </div>
  );
};
