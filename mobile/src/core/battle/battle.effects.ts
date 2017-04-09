import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { BattleActions } from './battle.actions';
import { Battle } from './battle.model';
import { BattleService } from './battle.service';

@Injectable()
export class BattleEffects {

  constructor(
    private actions$: Actions,
    private battleService: BattleService
  ) {

  }

  @Effect() getBattle$ = this.actions$
    .ofType(BattleActions.Types.GET_BATTLE)
    .switchMap(action =>
      this.battleService.getBattle(action.payload)
        .map((battle: Battle) => new BattleActions.GetBattleSuccess(battle))
        .catch((e) => of(new BattleActions.GetBattleFail(e)))
    )
}
