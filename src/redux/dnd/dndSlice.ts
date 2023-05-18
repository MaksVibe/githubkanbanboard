import { createSlice } from "@reduxjs/toolkit";
import { getItem, getLocateFrom } from "./dndOperations";

export interface repoState {
  item: {
    id: null;
    error: null;
  };
  locateFrom: {
    value: null;
    error: null;
  };
}

const initialState: repoState = {
  item: {
    id: null,
    error: null,
  },
  locateFrom: {
    value: null,
    error: null,
  },
};

export const dndSlice = createSlice({
  name: "dndSlice",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getLocateFrom.pending, state => {
        state.locateFrom.value = null;
        state.locateFrom.error = null;
      })
      .addCase(getLocateFrom.fulfilled, (state, { payload }) => {
        state.locateFrom.value = payload;
        state.locateFrom.error = null;
      })
      .addCase(getLocateFrom.rejected, (state, { payload }) => {
        state.locateFrom.value = null;
        state.locateFrom.error = payload;
      })

      .addCase(getItem.pending, state => {
        state.item.id = null;
        state.item.error = null;
      })
      .addCase(getItem.fulfilled, (state, { payload }) => {
        state.item.id = payload;
        state.item.error = null;
      })
      .addCase(getItem.rejected, (state, { payload }) => {
        state.item.id = null;
        state.item.error = payload;
      });
  },
});

export const dndReducer = dndSlice.reducer;
