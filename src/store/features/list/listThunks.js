import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/utils/axiosInstance";

import { NEXT_PUBLIC_API_URL } from "@/utils/envConfig";

export const getLists = createAsyncThunk(
  "lists/getLists",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/list/get-lists`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.code);
    }
  }
);

export const createList = createAsyncThunk(
  "lists/createList",
  async (listData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/list/create-list`,
        listData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.code);
    }
  }
);
