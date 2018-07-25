import {IAction} from '../interfaces/i-action';
import {INode} from '../interfaces/i-node';

export const SET_PATH = 'SET_PATH';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SET_SELECTED_NODE = 'SET_SELECTED_NODE';

export class SetPath implements IAction {
  readonly type = SET_PATH;
  payload: string;
}

export class SetLoadingState implements IAction {
  readonly type = SET_LOADING_STATE;
  payload: boolean;
}

export class SetSelectedNode implements IAction {
  readonly type = SET_SELECTED_NODE;
  payload: INode;
}

export type Actions = SetPath | SetLoadingState | SetSelectedNode;
