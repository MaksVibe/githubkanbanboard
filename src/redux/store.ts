import { configureStore } from '@reduxjs/toolkit';

import { dndReducer } from './dnd/dndSlice';
import { repoReducer } from './repo/repoSlice';

export const store = configureStore({
  reducer: {
    repo: repoReducer,
    dndActions: dndReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
