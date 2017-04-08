import { Action } from '@ngrx/store';
import { type } from '../../type';
import { User } from './user.model';
// import { UserState } from './user.reducers';

export namespace UserActions {

  export const Types = {
    GET_USER: type('[User] Get User'),
    GET_USER_SUCCESS: type ('[User] Get User Success'),
    GET_USER_FAIL: type ('[User] Get User Fail'),
    USER_LOGIN: type ('[User] User Login'),
    USER_LOGIN_SUCCESS: type ('[User] User Login Success'),
    USER_LOGIN_FAIL: type ('[User] User Login Fail'),
    EDIT_USER: type('[User] Edit User'),
    EDIT_USER_SUCCESS: type('[User] Edit User Success'),
    EDIT_USER_FAIL: type('[User] Edit User Fail'),
    SEND_QR: type('[User] Send QR'),
    SEND_QR_SUCCESS: type('[User] Send QR Success'),
    SEND_QR_FAIL: type('[User] Send QR Fail'),


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

  export class UserLogin implements Action {
    type = Types.USER_LOGIN;

    constructor(public payload: string) { }
  }

  export class UserLoginSuccess implements Action {
    type = Types.USER_LOGIN_SUCCESS;

    constructor(public payload: User) { }
  }

  export class UserLoginFail implements Action {
    type = Types.USER_LOGIN_FAIL;

    constructor(public payload: any) { }
  }

  export class EditUser implements Action {
    type = Types.EDIT_USER;

    constructor(public payload: any) { }
  }

  export class EditUserSuccess implements Action {
    type = Types.EDIT_USER_SUCCESS;

    constructor(public payload: User) { }
  }

  export class EditUserFail implements Action {
    type = Types.EDIT_USER_FAIL;

    constructor(public payload: any) { }
  }

  export class SendQR implements Action {
    type = Types.SEND_QR;

    constructor(public payload: any) { }
  }

  export class SendQRSuccess implements Action {
    type = Types.SEND_QR_SUCCESS;

    constructor(public payload: any) { }
  }

  export class SendQRFail implements Action {
    type = Types.SEND_QR_FAIL;

    constructor(public payload: any) { } // recibe un userState
  }





  export type Actions
    = GetUser
    | GetUserSuccess
    | GetUserFail
    | UserLogin
    | UserLoginSuccess
    | UserLoginFail
    | EditUser
    | EditUserSuccess
    | EditUserFail
    | SendQR
    | SendQRSuccess
    | SendQRFail

}
