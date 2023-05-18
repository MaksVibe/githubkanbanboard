export const selectRepo = (state: { repo: any }) => state.repo;

export interface dnd {
  dndActions: { locateFrom: any; item: any };
}
export const selectLocateFrom = (state: dnd) => state.dndActions.locateFrom;
export const selectItem = (state: dnd) => state.dndActions.item;
