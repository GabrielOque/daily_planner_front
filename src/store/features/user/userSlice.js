import { setToken } from "@/utils/auth";
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "@/store/features/user/userThunks";

const userSlice = createSlice({
  name: "userAuth",
  initialState: {
    user: null,
    isLoggedIn: false,
    isLoading: false,
    error: null,
    isMeeting: false,
    isFloatingMeeting: false,
    roomInstance: null,
  },

  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = null;
      state.isMeeting = false;
      state.isFloatingMeeting = false;
      state.roomInstance = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setUserAuth: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true;
      state.isLoading = false;
      state.error = null;
    },
    setIsMeeting: (state, action) => {
      state.isMeeting = action.payload;
    },
    setIsFloatingMeeting: (state, action) => {
      state.isFloatingMeeting = action.payload;
    },
    setRoomInstance: (state, action) => {
      state.roomInstance = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        setToken(action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isLoggedIn = true;
        setToken(action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
export const {
  logoutUser,
  clearError,
  setUserAuth,
  setIsMeeting,
  setIsFloatingMeeting,
  setRoomInstance,
} = userSlice.actions;
