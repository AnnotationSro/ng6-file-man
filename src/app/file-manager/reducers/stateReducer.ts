import {StateInterface} from '../interfaces/state.interface';
import * as ACTIONS from './actions.action';

const initialState: StateInterface = {
  path: '',
  isLoading: true,
  selectedNode: null
};

export function stateReducer(state: StateInterface = initialState, action: ACTIONS.Actions): StateInterface {
  // console.log('Previous state: ', state);
  // console.log('ACTION state: ', action.type);
  // console.log('ACTION payload: ', action.payload);

  switch (action.type) {
    case ACTIONS.SET_PATH :
      if (state.path === action.payload) {
        return state;
      }
      return {...state, path: action.payload, isLoading: true};
    case ACTIONS.SET_LOADING_STATE :
      return {...state, isLoading: action.payload};
    case ACTIONS.SET_SELECTED_NODE :
      return {...state, selectedNode: action.payload};
    default:
      return initialState;
  }
}
