"use client";

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/store/features/user/userSlice";

const store = configureStore({
  reducer: {
    userAuth: userSlice,
  },
});

export default store;
