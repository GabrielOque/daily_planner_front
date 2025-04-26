// components/JoinMeeting.js
"use client";
import Button from "@/components/Button";
import CustomInput from "@/components/CustomInput";
import Connecting from "@/components/Connecting";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsMeeting,
  setIsFloatingMeeting,
  setRoomInstance as setRoomInstanceRedux,
} from "@/store/features/user/userSlice";
import {
  VideoConference,
  RoomAudioRenderer,
  RoomContext,
} from "@livekit/components-react";
import { Room } from "livekit-client";
import { useEffect, useState, useRef } from "react";
import axios from "@/utils/axiosInstance";
import {
  NEXT_PUBLIC_LIVEKIT_URL,
  NEXT_PUBLIC_API_URL,
} from "@/utils/envConfig";
import { useRouter } from "next/navigation";
import "@livekit/components-styles";

export default function JoinMeeting() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [confirmed, setConfirmed] = useState(false);
  const [isMicrophoneEnabled, setIsMicrophoneEnabled] = useState(false);
  const [isCameraEnabled, setIsCameraEnabled] = useState(false);
  const [userName, setUserName] = useState(
    `@${Math.floor(Math.random() * 100000000)}`
  );
  const { roomInstance, isFloatingMeeting } = useSelector(
    (state) => state.userAuth
  );
  const videoRef = useRef(null);

  console.log(roomInstance);

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
      if (stream) stream.getTracks().forEach((t) => t.stop());
    };
  }, [isCameraEnabled]);

  return (
    <>
      {!confirmed && !roomInstance && !isFloatingMeeting ? (
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
                className={`${
                  isMicrophoneEnabled
                    ? "fad fa-microphone"
                    : "fad fa-microphone-slash bg-red-700 text-textPrimary"
                } text-2xl w-full h-full text-center pt-2`}
              />
            </span>
            <span
              className="w-14 h-10 flex justify-center items-center rounded-xl transition-transform duration-200 cursor-pointer border-2 border-gray-300 text-neutral overflow-hidden"
              onClick={() => setIsCameraEnabled(!isCameraEnabled)}
            >
              <i
                className={`${
                  isCameraEnabled
                    ? "fad fa-video"
                    : "fad fa-video-slash bg-red-700 text-textPrimary"
                } text-2xl w-full h-full text-center pt-2`}
              />
            </span>
          </div>
          <div className="flex flex-col items-center justify-center mt-4">
            <CustomInput
              loading={false}
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              placeholder="Nombre"
              height="h-10 md:h-12"
              className="w-80 mt-4 bg-slate-600"
            />
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
                router.push("/planner/calendar");
                setIsCameraEnabled(false);
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
                dispatch(setIsMeeting(true));
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
          userName={userName}
        />
      )}
    </>
  );
}

const JoinConfirmed = ({ isMicrophoneEnabled, isCameraEnabled, userName }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const roomName = new URLSearchParams(window.location.search).get("roomName");
  const { roomInstance: savedInstance, user } = useSelector(
    (state) => state.userAuth
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    let currentRoom = null;

    const joinRoom = async () => {
      if (savedInstance) {
        console.log("🟡 Ya existe una sala activa, se reutiliza.");
        setLoading(false);
        return;
      }

      try {
        const res = await axios.post(
          `${NEXT_PUBLIC_API_URL}/event/join-meeting`,
          { roomName, userEmail: user.email, userName }
        );
        console.log("🟢 Conectando a la sala:", res.data);
        const { token } = res.data;
        if (!mounted || !token) return;

        const room = new Room({ adaptiveStream: true, dynacast: true });
        await room.connect(NEXT_PUBLIC_LIVEKIT_URL, token);

        room.localParticipant.setCameraEnabled(isCameraEnabled);
        room.localParticipant.setMicrophoneEnabled(isMicrophoneEnabled);

        // Manejar participantes que se conectan
        room.on("participantConnected", (p) => {
          console.log("Nuevo participante conectado:", p);

          // Suscribirse a los tracks si están disponibles
          if (p.tracks) {
            p.tracks.forEach((t) => t.subscribe());
          }
        });

        // Detectar cuando un participante agrega nuevos tracks
        room.on("trackSubscribed", (track, participant) => {
          console.log("Track suscrito:", track);
          // Actualizar el estado de los tracks del participante si es necesario
        });

        room.on("disconnected", (reason) => {
          console.warn("🔌 Desconectado. Motivo:", reason);
          if (!room.isConnected) {
            dispatch(setIsFloatingMeeting(false));
            dispatch(setRoomInstanceRedux(null));
            dispatch(setIsMeeting(false));
            router.push("/planner/calendar");
          }
        });

        dispatch(setRoomInstanceRedux(room)); // guarda en Redux
      } catch (err) {
        console.error("❌ Error al conectar:", err);
        dispatch(setIsMeeting(false));
        window.close();
      } finally {
        setLoading(false);
      }
    };

    joinRoom();

    return () => {
      mounted = false;
      currentRoom?.disconnect();
    };
  }, [roomName, userName, savedInstance]);

  if (loading) return <Connecting title="Conectando a la reunión..." />;
  if (!savedInstance)
    return <Connecting title="Esperando a los participantes..." />;

  return (
    <RoomContext.Provider value={savedInstance}>
      <div
        className="relative"
        data-lk-theme="default"
        style={{ height: "100vh", overflow: "hidden" }}
      >
        <button
          className="absolute top-4 left-4 z-10 bg-red-500 text-white px-2  rounded"
          onClick={() => {
            dispatch(setRoomInstanceRedux(savedInstance));
            dispatch(setIsFloatingMeeting(true));
            dispatch(setIsMeeting(false));
            router.push("/planner");
          }}
        >
          Minimizar
        </button>
        <MyVideoConference />
        <RoomAudioRenderer />
      </div>
    </RoomContext.Provider>
  );
};

function MyVideoConference() {
  return (
    <div className="h-[100vh] overflow-hidden bg-neutral">
      <VideoConference />
    </div>
  );
}
