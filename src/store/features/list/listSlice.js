import { createSlice } from "@reduxjs/toolkit";

import { getLists, createList } from "@/store/features/list/listThunks";

const listSlice = createSlice({
  name: "lists",
  initialState: {
    lists: [],
    isLoading: false,
    error: null,
    success: null,
  },

  reducers: {
    removeList: (state, action) => {
      state.lists = state.lists.filter((list) => list._id !== action.payload);
    },

    clearSuccess: (state) => {
      state.success = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLists.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLists.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists = action.payload.map((list) => ({
          id: list._id,
          label: list.label,
          color: list.color,
          redirect: "/planner/tasks-list",
        }));
      })
      .addCase(getLists.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lists.unshift({
          id: action.payload._id,
          label: action.payload.label,
          color: action.payload.color,
          redirect: "/planner/tasks-list",
        });
        state.success = "fulfilled";
      })
      .addCase(createList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.success = null;
      });
  },
});

export default listSlice.reducer;
export const { removeList, clearSuccess } = listSlice.actions;
