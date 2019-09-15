// ngrx store app state
import {NodeInterface} from './node.interface';

export interface FileManagerState {
  path: string;
  selectedNode: NodeInterface;
  isLoading: boolean;
}
