"use client";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userSlice from "@/store/features/user/userSlice";

const store = configureStore({
  reducer: {
    userAuth: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // ruta en state donde está la Room
        ignoredPaths: ["userAuth.roomInstance"],
        // acciones que llevan Room en payload
        ignoredActions: [
          "userAuth/setRoomInstance",
          "userAuth/setIsFloatingMeeting",
          "userAuth/setIsMeeting",
        ],
      },
    }),
});

export default store;
