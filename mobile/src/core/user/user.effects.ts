import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { User } from './user.model';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { UserService } from './user.service';
import { BarActions } from '../bar/bar.actions';
import { Bar } from '../bar/bar.model';
import { PrizeActions } from '../prize/prize.actions';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {

  }

/* GET USER
  @Effect() getUser$ = this.actions$
    .ofType(UserActions.Types.USER_LOGIN)
    .switchMap(action =>
      this.userService.getUser(action.payload)
        .map((user: User) => new UserActions.UserLoginSuccess(new User(user)))
        .catch((e) => of(new UserActions.UserLoginFail(e)))
    );
    */
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
        .mergeMap((data: any) => {
          console.log('data');
          console.log(data);
          return Observable.from([
            new UserActions.EditUserSuccess(data.user),
            new BarActions.SetCurrentBarId(data.bar.id),
            new BarActions.GetBarSuccess(data.bar),
            // TODO: rest of actions
          ])
        })
        .catch((e) => of(new UserActions.EditUserFail(e)))
    );

  @Effect() getUsers$ = this.actions$
    .ofType(UserActions.Types.GET_USERS)
    .switchMap(action =>
      this.userService.getUsers(action.payload)
        .map((users: User[]) => new UserActions.GetUsersSuccess(users))
        .catch((e) => of(new UserActions.GetUsersFail(e)))
    );

  @Effect() sendPrize$ = this.actions$
    .ofType(UserActions.Types.SEND_PRIZE)
    .mergeMap(action =>
      this.userService.sendPrize(action.payload)
        .mergeMap((data: any) => {
          console.log('data');
          console.log(data);
          return Observable.from([
            new UserActions.EditUserSuccess(data.user),
            new UserActions.GetUsersSuccess(data.receiver),
            new PrizeActions.UpdatePrizeSuccess(data.prize),
            // TODO: updateBattle (me devuleve data.battle tambien)
          ])
        })
    )


}
