"use client";

import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    userAuth: userSlice,
  },
});

export default store;
