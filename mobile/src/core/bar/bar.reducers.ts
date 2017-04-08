import { Bar } from './bar.model';
import { BarActions } from './bar.actions';

export interface BarState {
  bar: Bar,
  loading: boolean
}

export const initialBarState: BarState = {
  bar: undefined,
  loading: false
}

export function bar(state = initialBarState, action: BarActions.Actions) {
  switch (action.type) {

    case BarActions.Types.GET_BAR:
      return Object.assign({}, state, {loading:true, error: null});

    case BarActions.Types.GET_BAR_SUCCESS:
      return Object.assign({}, state, {
        bar: action.payload,
        loading: false
      });

    case BarActions.Types.GET_BAR_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });



    default:
      return state;
  }

}
