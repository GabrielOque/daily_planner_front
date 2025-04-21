import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axiosInstance";

import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/user/signin`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.code);
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/user/signup`,
        userData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.code);
    }
  }
);
