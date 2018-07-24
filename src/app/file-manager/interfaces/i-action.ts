import {Action} from '@ngrx/store';

export interface IAction extends Action {
  payload?: any;
}
