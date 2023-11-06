import { createSlice } from '@reduxjs/toolkit';

import { fetchRepo, Repo, updateRepo } from './repoOperations';

export const defaultIssue = {
  id: 0,
  title: '',
  number: 0,
  created_at: '',
  user: {
    login: '',
  },
  comments: 0,
};

export const defaultRepo = {
  id: '',
  name: '',
  owner: '',
  stars: 0,
  issues: {
    toDo: [defaultIssue],
    inProgress: [defaultIssue],
    done: [defaultIssue],
  },
};

export type RepoState = {
  currentRepo: Repo;
  error: null | string;
};

const initialState: RepoState = {
  currentRepo: defaultRepo,
  error: null,
};

export const repoSlice = createSlice({
  name: 'repoSlice',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Get a repo info
      .addCase(fetchRepo.pending, state => {
        state.currentRepo = defaultRepo;
        state.error = null;
      })
      .addCase(fetchRepo.fulfilled, (state, { payload }) => {
        state.currentRepo = payload;
        state.error = null;
      })
      .addCase(fetchRepo.rejected, (state, { payload }) => {
        state.currentRepo = defaultRepo;
        state.error = payload as string;
      })

      // Update repository issues
      .addCase(updateRepo.pending, state => {
        state = { ...state };
        state.error = null;
      })
      .addCase(updateRepo.fulfilled, (state, { payload }) => {
        state.currentRepo = payload;
        state.error = null;
      })
      .addCase(updateRepo.rejected, (state, { payload }) => {
        state = { ...state };
        state.error = payload as string;
      });
  },
});

export const repoReducer = repoSlice.reducer;
