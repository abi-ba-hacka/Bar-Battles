import { Bar } from './bar.model';
import { BarActions } from './bar.actions';
import { updateAndfilterUniqueItems } from '../../shared/helpers';


export interface BarState {
  activeBar: string,
  bars: Bar[],
  loading: boolean
}

export const initialBarState: BarState = {
  activeBar: '',
  bars: [],
  loading: false
}

export function bar(state = initialBarState, action: BarActions.Actions): BarState {
  switch (action.type) {

    case BarActions.Types.GET_BAR:
      return Object.assign({}, state, {loading:true, error: null});

    case BarActions.Types.GET_BAR_SUCCESS:
      console.log('GET_BAR_SUCCESS');
      console.log(action);
      return Object.assign({}, state, {
        bars: updateAndfilterUniqueItems(state.bars.concat(action.payload)),
        loading: false
      });

    case BarActions.Types.GET_BAR_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });

    case BarActions.Types.SET_CURRENT_BAR_ID:
      return Object.assign({}, state, {
        activeBar: action.payload,
        loading: false
      });



    default:
      return state;
  }

}
