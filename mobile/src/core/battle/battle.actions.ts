import { Action } from '@ngrx/store';
import { type } from '../../type';
import { Battle } from './battle.model';

export namespace BattleActions {

  export const Types = {
    GET_BATTLE: type('[Battle] Get Battle'),
    GET_BATTLE_SUCCESS: type('[Battle] Get Battle Success'),
    GET_BATTLE_FAIL: type('[Battle] Get Battle Fail'),
  }

  export class GetBattle implements Action {
    type = Types.GET_BATTLE;

    constructor(public payload: string) { }
  }

  export class GetBattleSuccess implements Action {
    type = Types.GET_BATTLE_SUCCESS;

    constructor(public payload: Battle) { }
  }

  export class GetBattleFail implements Action {
    type = Types.GET_BATTLE_FAIL;

    constructor(public payload: any) { }
  }

  export type Actions
    = GetBattle
    | GetBattleSuccess
    | GetBattleFail


}
