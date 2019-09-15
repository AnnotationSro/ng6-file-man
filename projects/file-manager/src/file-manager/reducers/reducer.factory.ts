import {reducer} from './stateReducer';
import {ActionReducerMap} from '@ngrx/store';
import {FileManagerState} from '../interfaces/state.interface';

export interface AppStore {
  fileManagerState: FileManagerState;
}

export const reducers: ActionReducerMap<AppStore> = {
  fileManagerState: reducer
};
