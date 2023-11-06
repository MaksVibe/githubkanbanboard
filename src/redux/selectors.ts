import { DndState } from './dnd/dndSlice';
import { RepoState } from './repo/repoSlice';

export const selectRepo = (state: { repo: RepoState }) => state.repo;
export const selectLocateFrom = (state: { dndActions: DndState }) => state.dndActions.locateFrom;
export const selectItem = (state: { dndActions: DndState }) => state.dndActions.item;
