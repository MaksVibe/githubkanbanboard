import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLocateFrom: unknown = createAsyncThunk('locateFrom', async (location: string, thunkAPI) => {
  try {
    return location;
  } catch ({ message }) {
    return thunkAPI.rejectWithValue(message);
  }
});

export const getItem: unknown = createAsyncThunk('getItem', async (id, thunkAPI) => {
  try {
    return id;
  } catch ({ message }) {
    return thunkAPI.rejectWithValue(message);
  }
});
