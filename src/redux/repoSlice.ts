import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface repoState {
  value: [];
}

const initialState: repoState = {
  value: [],
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {},
});

export const {} = counterSlice.actions;

export default counterSlice.reducer;
