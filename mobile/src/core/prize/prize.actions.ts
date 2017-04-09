import { Action } from '@ngrx/store';
import { type } from '../../type';
import { Prize } from '../../shared/models/prize.model';

export namespace PrizeActions {

  export const Types = {
    UPDATE_PRIZE_SUCCESS: type('[Prize] Update Prize Success'),

  }

  export class UpdatePrizeSuccess implements Action {
    type = Types.UPDATE_PRIZE_SUCCESS;

    constructor(public payload: Prize) { }
  }

  export type Actions
    = UpdatePrizeSuccess
}
