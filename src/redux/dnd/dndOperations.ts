import { createAsyncThunk } from "@reduxjs/toolkit";

export const getLocateFrom: any = createAsyncThunk(
  "locateFrom",
  async (location: string, thunkAPI) => {
    try {
      return location;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getItem: any = createAsyncThunk(
  "getItem",
  async (id, thunkAPI) => {
    try {
      return id;
    } catch ({ message }) {
      return thunkAPI.rejectWithValue(message);
    }
  }
);
