import {ActionInterface} from '../interfaces/action.interface';
import {NodeInterface} from '../interfaces/node.interface';

export const SET_PATH = 'SET_PATH';
export const SET_LOADING_STATE = 'SET_LOADING_STATE';
export const SET_SELECTED_NODE = 'SET_SELECTED_NODE';

export class SetPath implements ActionInterface {
  readonly type = SET_PATH;
  payload: string;
}

export class SetLoadingState implements ActionInterface {
  readonly type = SET_LOADING_STATE;
  payload: boolean;
}

export class SetSelectedNode implements ActionInterface {
  readonly type = SET_SELECTED_NODE;
  payload: NodeInterface;
}

export type Actions = SetPath | SetLoadingState | SetSelectedNode;
