import { Prize } from '../../shared/models/prize.model';
import { PrizeActions } from './prize.actions';
import { updateAndfilterUniqueItems } from '../../shared/helpers';

export interface PrizeState {
  prizes: Prize[],
  loading: boolean
}

export const initialPrizeState: PrizeState = {
  prizes: [],
  loading: false
}

export function prize(state = initialPrizeState, action: PrizeActions.Actions): PrizeState {
  switch (action.type) {
    case PrizeActions.Types.UPDATE_PRIZE_SUCCESS:
      return Object.assign({}, state, {
        prizes: updateAndfilterUniqueItems(state.prizes.concat(action.payload)),
        loading: false
      });

    default:
        return state;
  }
}
