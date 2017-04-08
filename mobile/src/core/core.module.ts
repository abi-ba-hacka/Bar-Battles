import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeerService } from './services/beer.service';
import { UserService } from './user/user.service';

@NgModule({
  imports: [
    CommonModule,
  ],

  providers: [
    BeerService,
    UserService
  ]
})

export class CoreModule { }
