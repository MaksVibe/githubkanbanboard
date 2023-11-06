import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Repo } from './repoOperations';

export type RepoState = {
  currentRepo: null | Repo;
  error: null | string;
};

const initialState: RepoState = {
  currentRepo: null,
  error: null,
};

export const repoSlice = createSlice({
  name: 'repoSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get a repo info
      .addMatcher(
        action => action.type.endsWith('/pending'),
        state => {
          state.currentRepo = null;
          state.error = null;
        },
      )
      .addMatcher(
        action => action.type.endsWith('/fulfilled'),
        (state, action: PayloadAction<Repo>) => {
          state.currentRepo = action.payload;
          state.error = null;
        },
      )
      .addMatcher(
        action => action.type.endsWith('/rejected'),
        (state, action: PayloadAction<string>) => {
          state.currentRepo = null;
          state.error = action.payload;
        },
      );

    // Update repository issues
    // .addCase(updateRepo.pending, state => {
    //   state.currentRepo = null;
    //   state.error = null;
    // })
    // .addCase(updateRepo.fulfilled, (state, action: PayloadAction<Repo>) => {
    //   state.currentRepo = action.payload;
    //   state.error = null;
    // })
    // .addCase(updateRepo.rejected, (state, action: PayloadAction<string>) => {
    //   state.currentRepo = null;
    //   state.error = action.payload;
    // });
  },
});

export const repoReducer = repoSlice.reducer;
