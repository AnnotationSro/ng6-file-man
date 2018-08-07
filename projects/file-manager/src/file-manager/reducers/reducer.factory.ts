import {stateReducer} from './stateReducer';
import {ActionReducerMap} from '@ngrx/store';
import {StateInterface} from '../interfaces/state.interface';

export interface AppStore {
  fileManagerState: StateInterface;
}

export const reducers: ActionReducerMap<AppStore> = {
  fileManagerState: stateReducer
};
