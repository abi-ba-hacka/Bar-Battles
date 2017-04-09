import { Action } from '@ngrx/store';
import { type } from '../../type';
import { Bar } from './bar.model';

export namespace BarActions {

  export const Types = {
    GET_BAR: type('[Bar] Get Bar'),
    GET_BAR_SUCCESS: type('[Bar] Get Bar Success'),
    GET_BAR_FAIL: type('[Bar] Get Bar Fail'),
    SET_CURRENT_BAR_ID: type('[Bar] Set Current Bar Id'),
    GET_BARS: type('[Bar] Get bars'),
    GET_BARS_SUCCESS: type('[Bar] Get bars Success'),
    GET_BARS_FAIL: type('[Bar] Get bars Fail'),

  }

  export class GetBar implements Action {
    type = Types.GET_BAR;

    constructor(public payload: string) { }
  }

  export class GetBarSuccess implements Action {
    type = Types.GET_BAR_SUCCESS;

    constructor(public payload: Bar) { }
  }

  export class GetBarFail implements Action {
    type = Types.GET_BAR_FAIL;

    constructor(public payload: any) { }
  }

  export class SetCurrentBarId implements Action {
    type = Types.SET_CURRENT_BAR_ID;

    constructor(public payload: string) { }
  }

  export class GetBars implements Action {
    type = Types.GET_BARS;

    constructor(public payload: string[]) { }
  }

  export class GetBarsSuccess implements Action {
    type = Types.GET_BARS_SUCCESS;

    constructor(public payload: Bar[]) { }
  }

  export class GetBarsFail implements Action {
    type = Types.GET_BARS_FAIL;

    constructor(public payload: any) { }
  }



  export type Actions
    = GetBar
    | GetBarSuccess
    | GetBarFail
    | SetCurrentBarId
    | GetBars
    | GetBarsSuccess
    | GetBarsFail
}
