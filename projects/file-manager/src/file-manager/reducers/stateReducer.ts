import * as ACTIONS from "./actions.action";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { NodeInterface } from "../interfaces/node.interface";
import { FileManagerActions } from "./actions.action";

export interface FileManagerState {
  path: string;
  isLoading: boolean;
  selectedNode: NodeInterface;
}

export const initialState: FileManagerState = {
  path: "",
  isLoading: false,
  selectedNode: null
};

export const fileManagerStateSelector = createFeatureSelector<FileManagerState>(
  "fileManager"
);

export function reducer(
  state: FileManagerState = initialState,
  action: ACTIONS.Actions
): FileManagerState {
  // console.log('Previous state: ', state);
  // console.log('ACTION type: ', action.type);
  // console.log('ACTION payload: ', action.payload);

  switch (action.type) {
    case FileManagerActions.SetPath:
      if (state.path === action.payload) {
        return state;
      }
      return { ...state, path: action.payload, isLoading: true };
    case FileManagerActions.SetLoadingState:
      return { ...state, isLoading: action.payload };
    case FileManagerActions.SetSelectedNode:
      return { ...state, selectedNode: action.payload };
    default:
      return state;
  }
}

export const fileManagerSelectedNode = createSelector(
  fileManagerStateSelector,
  (state: FileManagerState) => state.selectedNode
);

export const fileManagerSelectedPath = createSelector(
  fileManagerStateSelector,
  (state: FileManagerState) => state.path
);

export const fileManagerIsLoading = createSelector(
  fileManagerStateSelector,
  (state: FileManagerState) => state.isLoading
);
