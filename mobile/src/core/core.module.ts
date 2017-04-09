import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeerService } from './services/beer.service';
import { UserService } from './user/user.service';
import { BattleService } from './battle/battle.service';
import { BarService } from './bar/bar.service';

@NgModule({
  imports: [
    CommonModule,
  ],

  providers: [
    BeerService,
    UserService,
    BattleService,
    BarService,
  ]
})

export class CoreModule { }
