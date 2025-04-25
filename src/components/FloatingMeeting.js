// components/FloatingMeeting.js
"use client";
import { useSelector, useDispatch } from "react-redux";
// import Draggable from "react-draggable";
import Draggable from "react-draggable";
import { Resizable } from "re-resizable";
import {
  setIsFloatingMeeting,
  setIsMeeting,
} from "@/store/features/user/userSlice";
import {
  RoomContext,
  RoomAudioRenderer,
  VideoConference,
} from "@livekit/components-react";
import { useRouter } from "next/navigation";
import "@livekit/components-styles";

//Constants
const configProps = {};

const FloatingMeeting = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { roomInstance, isFloatingMeeting } = useSelector(
    (state) => state.userAuth
  );

  if (!isFloatingMeeting || !roomInstance) return null;

  return (
    <RoomContext.Provider value={roomInstance}>
      <Draggable bounds="body" handle=".drag-handle">
        <Resizable
          defaultSize={{ width: 300, height: 200 }}
          minWidth={300}
          minHeight={200}
          maxWidth={800}
          maxHeight={600}
          enable={{
            topRight: true,
            top: false,
            right: false,
            bottom: false,
            left: false,
            topLeft: false,
            bottomRight: false,
            bottomLeft: false,
          }}
          style={{
            position: "fixed",
            bottom: "1rem",
            right: "1rem",
            zIndex: 9999,
          }}
          className="bg-black rounded-xl pb-5 pt-1 shadow-lg overflow-hidden cursor-move"
        >
          <div className="w-full h-full" data-lk-theme="default">
            <div className="drag-handle w-full h-6 bg-gray-800 text-white text-xs px-2 flex items-center justify-between">
              <span>Reunión</span>
              <button
                onClick={() => {
                  dispatch(setIsFloatingMeeting(false));
                  dispatch(setIsMeeting(true));
                  router.push(
                    `/planner/join-meeting/?roomName=room-7109&userName=anfitrion`
                  );
                }}
                className="bg-white text-black px-2 py-0.5 rounded text-xs"
              >
                Maximizar
              </button>
            </div>
            <VideoConference />
            <RoomAudioRenderer />
          </div>
        </Resizable>
      </Draggable>
    </RoomContext.Provider>
  );
};

export default FloatingMeeting;
