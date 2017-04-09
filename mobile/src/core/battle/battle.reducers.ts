import { Battle } from './battle.model';
import { BattleActions } from './battle.actions';

export interface BattleState {
  battle: Battle,
  loading: boolean,
}

export const initialBattleState: BattleState = {
  battle: undefined,
  loading: false
}

export function battle(state = initialBattleState, action: BattleActions.Actions): BattleState {
  switch (action.type) {
    case BattleActions.Types.GET_BATTLE:
      return Object.assign({}, state, {loading: true, error: null});

    case BattleActions.Types.GET_BATTLE_SUCCESS:
      return Object.assign({}, state, {
        battle: action.payload,
        loading: false
      });

    case BattleActions.Types.GET_BATTLE_FAIL:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false
      });



    default:
        return state;
  }
}
