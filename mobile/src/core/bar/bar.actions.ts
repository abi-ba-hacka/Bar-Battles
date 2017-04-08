import { Action } from '@ngrx/store';
import { type } from '../../type';
import { Bar } from './bar.model';

export namespace BarActions {

  export const Types = {
    GET_BAR: type('[Bar] Get Bar'),
    GET_BAR_SUCCESS: type('[Bar] Get Bar Success'),
    GET_BAR_FAIL: type('[Bar] Get Bar Fail'),
    SET_CURRENT_BAR_ID: type('[Bar] Set Current Bar Id'),

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



  export type Actions
    = GetBar
    | GetBarSuccess
    | GetBarFail
    | SetCurrentBarId
}
