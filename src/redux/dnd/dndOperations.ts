import { createAsyncThunk } from '@reduxjs/toolkit';

export const getLocateFrom = createAsyncThunk('dnd/getLocateFrom', async (location: string, thunkAPI) => {
  try {
    return location;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const getItem = createAsyncThunk('dnd/getItem', async (id: number, thunkAPI) => {
  try {
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});
