import { createSlice } from "@reduxjs/toolkit";
import { fetchRepo, refresh } from "./repoOperations";

export interface repoState {
  currentRepo: null;
  error: null;
}

const initialState: repoState = {
  currentRepo: null,
  error: null,
};

export const repoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get info about repo
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

      // Refresh page and render current repo
      .addCase(refresh.pending, state => {
        state.currentRepo = null;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state, { payload }) => {
        state.currentRepo = payload || null;
        state.error = null;
      })
      .addCase(refresh.rejected, (state, { payload }) => {
        state.currentRepo = null;
        state.error = payload;
      });
  },
});

// export const {} = counterSlice.actions;

export const repoReducer = repoSlice.reducer;
