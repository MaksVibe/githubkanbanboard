import { createSlice } from "@reduxjs/toolkit";
import { fetchRepo, updateRepo } from "./repoOperations";

export interface repoState {
  currentRepo: null;
  error: null;
}

const initialState: repoState = {
  currentRepo: null,
  error: null,
};

export const repoSlice = createSlice({
  name: "repoSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get a repo info
      .addCase(fetchRepo.pending, state => {
        state.currentRepo = null;
        state.error = null;
      })
      .addCase(fetchRepo.fulfilled, (state, { payload }) => {
        state.currentRepo = payload;
        state.error = null;
      })
      .addCase(fetchRepo.rejected, (state, { payload }) => {
        state.currentRepo = null;
        state.error = payload;
      })

      // Update repository issues
      .addCase(updateRepo.pending, state => {
        state.currentRepo = null;
        state.error = null;
      })
      .addCase(updateRepo.fulfilled, (state, { payload }) => {
        state.currentRepo = payload;
        state.error = null;
      })
      .addCase(updateRepo.rejected, (state, { payload }) => {
        state.currentRepo = null;
        state.error = payload;
      });
  },
});

export const repoReducer = repoSlice.reducer;
