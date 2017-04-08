import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserActions } from './user.actions';
import { User } from './user.model';
import { Observable } from 'rjxs';
import { of } from 'rxjs/observable/of';

@Injectable()
export class UserEffects {

  constructor(
    private actions$: Actions
  ) {

  }

  /*@Effect() getUser$ = this.actions$
    .ofType(UserActions.Types.GET_USER)
    .switchmap(action =>
      this.userService.getUser(action.payload) TODO userService
        .map((user: User) => new UserActions.GetUserSuccess(user))
        .catch((e) => of(new UserActions.GetUserFail(e)))
    )*/
}
