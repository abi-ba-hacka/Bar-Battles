import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { User } from './user.model';
import { Observable } from 'rjxs';
import { of } from 'rxjs/observable/of';
import { UserService } from './user.service';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService,
  ) {

  }

  @Effect() getUserByFacebookId = this.actions$
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


}
