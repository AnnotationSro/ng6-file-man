import {IState} from '../interfaces/i-state';
import * as ACTIONS from './actions.action';

const initialState: IState = {
  path: 'root',
  isLoading: true,
  selectedNode: null
};

export function stateReducer(state: IState = initialState, action: ACTIONS.Actions): IState {
  // console.log('Previous state: ', state);
  // console.log('ACTION: ', action.type);

  switch (action.type) {
    case ACTIONS.SET_PATH :
      return {...state, path: action.payload, isLoading: true};
    case ACTIONS.SET_LOADING_STATE :
      return {...state, isLoading: action.payload};
    case ACTIONS.SET_SELECTED_NODE :
      return {...state, selectedNode: action.payload};
    default:
      return initialState;
  }
}
