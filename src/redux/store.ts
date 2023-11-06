import { useDispatch } from 'react-redux';

import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { dndReducer } from './dnd/dndSlice';
import { repoReducer } from './repo/repoSlice';

const rootReducer = combineReducers({
  repo: repoReducer,
  dndActions: dndReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
