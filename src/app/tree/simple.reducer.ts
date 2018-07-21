import {Action} from '@ngrx/store';
import {IAction} from './interfaces/i-action';

export function simpleReducer(state: string = '', action: IAction) {
  console.log(action.type, state);

  switch (action.type) {
    case 'SET_PATH' :
      return action.payload;
  }

  return action.type;
}
