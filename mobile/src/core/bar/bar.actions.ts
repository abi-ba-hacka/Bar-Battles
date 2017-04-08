import { Action } from '@ngrx/store';
import { type } from '../../type';
import { Bar } from './bar.model';

export namespace BarActions {

  export const Types = {
    GET_BAR: type('[Bat] Get Bar'),
    GET_BAR_SUCCESS: type('[Bat] Get Bar Success'),
    GET_BAR_FAIL: type('[Bat] Get Bar Fail'),
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

  export type Actions
    = GetBar
    | GetBarSuccess
    | GetBarFail
}
