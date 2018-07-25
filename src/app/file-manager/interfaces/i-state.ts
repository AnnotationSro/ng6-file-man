// ngrx store app state
import {INode} from './i-node';

export interface IState {
  path: string;
  selectedNode: INode;
  isLoading: boolean;
}
