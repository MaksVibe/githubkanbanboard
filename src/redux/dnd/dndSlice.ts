import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getItem, getLocateFrom } from './dndOperations';

export type DndState = {
  item: {
    id: string;
    error: string;
  };
  locateFrom: {
    value: string;
    error: string;
  };
};

const initialState: DndState = {
  item: {
    id: '',
    error: '',
  },
  locateFrom: {
    value: '',
    error: '',
  },
};

export const dndSlice = createSlice({
  name: 'dndSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getLocateFrom.pending, state => {
      state.locateFrom.value = '';
      state.locateFrom.error = '';
    });
    builder.addCase(getLocateFrom.fulfilled, (state, action: PayloadAction<string>) => {
      state.locateFrom.value = action.payload;
      state.locateFrom.error = '';
    });
    builder.addCase(getLocateFrom.rejected, (state, action) => {
      state.locateFrom.value = '';
      state.locateFrom.error = action.payload instanceof Error ? action.payload.message : 'Something went wrong...';
    });
    builder.addCase(getItem.pending, state => {
      state.item.id = '';
      state.item.error = '';
    });
    builder.addCase(getItem.fulfilled, (state, action: PayloadAction<string>) => {
      state.item.id = action.payload;
      state.item.error = '';
    });
    builder.addCase(getItem.rejected, (state, action) => {
      state.item.id = '';
      state.item.error = action.payload instanceof Error ? action.payload.message : 'Something went wrong...';
    });
  },
});

export const dndReducer = dndSlice.reducer;
