import { configureStore } from "@reduxjs/toolkit";
import { repoReducer } from "./repo/repoSlice";
import { dndReducer } from "./dnd/dndSlice";

export const store = configureStore({
  reducer: {
    repo: repoReducer,
    dndActions: dndReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
