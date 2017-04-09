import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { BarActions } from './bar.actions';
import { Bar } from './bar.model';
import { BarService } from './bar.service';
import { BattleActions } from '../battle/battle.actions';

@Injectable()
export class BarEffects {

  constructor(
    private actions$: Actions,
    private barService: BarService
  ) {

  }

  @Effect() getBar$ = this.actions$
    .ofType(BarActions.Types.GET_BAR)
    .switchMap(action =>
      this.barService.getBar(action.payload)
        .map((bar: Bar) => new BarActions.GetBarSuccess(bar))
        .catch((e) => of(new BarActions.GetBarFail(e)))
    );

  @Effect() getBars$ = this.actions$
    .ofType(BattleActions.Types.GET_BATTLE_SUCCESS)
    .switchMap(action =>
      this.barService.getBars(action.payload.bars)
        .map((bars: Bar[]) => new BarActions.GetBarsSuccess(bars))
        .catch((e) => of(new BarActions.GetBarsFail(e)))
    )
}
