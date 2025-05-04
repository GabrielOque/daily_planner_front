import { createSlice } from "@reduxjs/toolkit";

import { getTags, createTag } from "@/store/features/tag/tagThunks";

const tagSlice = createSlice({
  name: "tags",
  initialState: {
    tags: [],
    isLoading: false,
    error: null,
    success: null,
  },

  reducers: {
    removeTag: (state, action) => {
      state.tags = state.tags.filter((tag) => tag._id !== action.payload);
    },

    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTags.pending, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags = action.payload.map((tag) => ({
          id: tag._id,
          label: tag.label,
          color: tag.color,
          redirect: "/planner/tasks-tag",
        }));
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(createTag.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(createTag.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tags.unshift({
          id: action.payload._id,
          label: action.payload.label,
          color: action.payload.color,
          redirect: "/planner/tasks-tag",
        });
        state.success = "fulfilled";
      })
      .addCase(createTag.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default tagSlice.reducer;
export const { removeTag, clearSuccess } = tagSlice.actions;
