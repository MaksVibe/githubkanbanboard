import { createSlice } from "@reduxjs/toolkit";
import { fetchRepo } from "./repoOperations";

export interface repoState {
  currentRepo: [];
}

const initialState: repoState = {
  currentRepo: [],
};

export const repoSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchRepo.fulfilled, (state, { payload }) => {
      state.currentRepo = payload;
    });
  },
});

// export const {} = counterSlice.actions;

export const repoReducer = repoSlice.reducer;
