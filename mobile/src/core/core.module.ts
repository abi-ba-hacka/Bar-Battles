import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeerService } from './services/beer.service';

@NgModule({
  imports: [
    CommonModule,
  ],

  providers: [
    BeerService,
  ]
})

export class CoreModule { }
