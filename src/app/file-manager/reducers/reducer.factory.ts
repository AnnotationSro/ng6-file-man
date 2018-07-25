import {stateReducer} from './stateReducer';
import {ActionReducerMap} from '@ngrx/store';
import {IState} from '../interfaces/i-state';

export interface AppStore {
  fileManagerState: IState;
}

export const reducers: ActionReducerMap<AppStore> = {
  fileManagerState: stateReducer
};
