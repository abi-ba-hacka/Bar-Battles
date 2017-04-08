import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { UserService } from './user.service';
import { BarActions } from '../bar/bar.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {

  }

  @Effect() getUserByFacebookId$ = this.actions$
    .ofType(UserActions.Types.USER_LOGIN)
    .switchMap(action =>
      this.userService.getUserByFacebookId(action.payload)
        .map((user: User) => new UserActions.UserLoginSuccess(new User(user)))
        .catch((e) => of(new UserActions.UserLoginFail(e)))
    );

  @Effect() editUser$ = this.actions$
    .ofType(UserActions.Types.EDIT_USER)
    .switchMap(action =>
      this.userService.edit(action.payload.id, action.payload.data)
        .map((user: User) => new UserActions.EditUserSuccess(new User(user)))
        .catch((e) => of(new UserActions.EditUserFail(e)))
    );

  @Effect() sendQR$ = this.actions$
    .ofType(UserActions.Types.SEND_QR)
    .mergeMap(action =>
      this.userService.redeemQR(action.payload.id, action.payload.qrcode)
        .map((data: any) => {
          return Observable.from([
            new UserActions.EditUserSuccess(data.user),
            new BarActions.GetBarSuccess(data.bar)
            // TODO: rest of actions
          ])
        })
        .catch((e) => of(new UserActions.EditUserFail(e)))
    );


}
