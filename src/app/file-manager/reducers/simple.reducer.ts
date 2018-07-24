import {IAction} from '../interfaces/i-action';

export function simpleReducer(state: string = '', action: IAction) {
  // console.log('Previous state: ', state);
  // console.log('Next state: ', action);

  switch (action.type) {
    case 'SET_PATH' :
      return action.payload;
  }

  return action;
}
