import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLocateFrom = createAsyncThunk('dnd/getLocateFrom', async (location: string, thunkAPI) => {
  try {
    return location;
  } catch ({ message }) {
    return thunkAPI.rejectWithValue(message as string);
  }
});

export const getItem = createAsyncThunk('dnd/getItem', async (id: string, thunkAPI) => {
  try {
    return id;
  } catch ({ message }) {
    return thunkAPI.rejectWithValue(message as string);
  }
});
