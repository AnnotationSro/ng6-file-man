import { ActionInterface } from "../interfaces/action.interface";
import { NodeInterface } from "../interfaces/node.interface";

export enum FileManagerActions {
  SetPath = "[FILE_MANAGER] SET_PATH",
  SetLoadingState = "[FILE_MANAGER] SET_LOADING_STATE",
  SetSelectedNode = "[FILE_MANAGER] SET_SELECTED_NODE"
}

export class SetPath implements ActionInterface {
  readonly type = FileManagerActions.SetPath;
  constructor(public payload: string) {}
}

export class SetLoadingState implements ActionInterface {
  readonly type = FileManagerActions.SetLoadingState;
  constructor(public payload: boolean) {}
}

export class SetSelectedNode implements ActionInterface {
  readonly type = FileManagerActions.SetSelectedNode;
  constructor(public payload: NodeInterface) {}
}

export type Actions = SetPath | SetLoadingState | SetSelectedNode;
