import { Action } from '@ngrx/store';
import { type } from '../../type';
import { User } from './user.model';

export namespace UserActions {

  export const Types = {
    GET_USER: type('[User] Get User'),
    GET_USER_SUCCESS: type ('[User] Get User Success'),
    GET_USER_FAIL: type ('[User] Get User Fail'),
  }

  export class GetUser implements Action {
    type = Types.GET_USER;

    constructor(public payload: number) { }
  }

  export class GetUserSuccess implements Action {
    type = Types.GET_USER_SUCCESS;

    constructor(public payload: number) { }
  }

  export class GetUserFail implements Action {
    type = Types.GET_USER_FAIL;

    constructor(public payload: any) { }
  }

  export type Actions
    = GetUser
    | GetUserSuccess
    | GetUserFail

}
