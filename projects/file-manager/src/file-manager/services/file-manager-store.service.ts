import {Injectable, isDevMode} from '@angular/core';
import {AppStore} from '../reducers/reducer.factory';
import {Observable, Subject} from 'rxjs';
import {NodeInterface} from '../interfaces/node.interface';
import {StateInterface} from '../interfaces/state.interface';
import {distinctUntilChanged, map} from 'rxjs/operators';

const initialState: StateInterface = {
  path: '',
  isLoading: true,
  selectedNode: null
};

@Injectable({
  providedIn: 'root'
})
export class FileManagerStoreService {
  private state: AppStore;

  private sub: Subject<AppStore> = new Subject<AppStore>();

  constructor() {
    this.state = {
      fileManagerState: initialState
    };

    // @ts-ignore
    window.getInfo = () => this.state;
  }

  dispatch(param: Actions) {
    Object.assign(this.state.fileManagerState, stateReducer(this.state.fileManagerState, param));
    this.sub.next(this.state);
    // if (isDevMode()) console.warn('[FileManagerStoreService] dispatch', param, JSON.parse(JSON.stringify(this.state)));
  }

  getState<R>(mapFn: (value: AppStore, index: number) => R): Observable<R> {
    if (typeof mapFn !== 'function') {
      throw new TypeError('argument is not a function. Are you looking for `mapTo()`?');
    }

    return this.sub.asObservable()
      .pipe(map(mapFn))
      .pipe(distinctUntilChanged());
  }
}


// REDUCERS
export function stateReducer(state: StateInterface = initialState, action: Actions): StateInterface {
  switch (action.type) {
    case SET_PATH :
      if (state.path === action.payload) {
        return state;
      }
      return {...state, path: action.payload, isLoading: true};
    case SET_LOADING_STATE :
      return {...state, isLoading: action.payload};
    case SET_SELECTED_NODE :
      return {...state, selectedNode: action.payload};
    default:
      return initialState;
  }
}


// ACTIONS
export interface ActionInterface {
  readonly type: string
  payload?: any;
}

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
