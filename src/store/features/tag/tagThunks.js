import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axiosInstance";

import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

export const getTags = createAsyncThunk(
  "tags/getTags",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/tag/get-tags`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.code);
    }
  }
);

export const createTag = createAsyncThunk(
  "tags/createTag",
  async (tagData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/tag/create-tag`,
        tagData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.code);
    }
  }
);
