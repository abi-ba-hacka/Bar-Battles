import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../core/user/user.model';
import { Bar } from '../../core/bar/bar.model';

@Component({
  selector: 'bar-tab',
  templateUrl: './bar-tab.component.html'
})

export class BarTabComponent implements OnInit{
    private battleStarted: boolean = false;

    private barName: string = 'Refugio Callao y Viamonte';
    private barLocation: string = 'Callao y Viamonte, Buenos Aires';
    private barImage: string = 'http://i.imgur.com/w3QXWgc.png';

    private opponentBarName: string = 'Circuito Chico Km 24.7';
    private opponentBarLocation: string = 'Callao y Viamonte, Buenos Aires';
    private opponentBarImage: string = 'http://i.imgur.com/oRhjO6O.png';

    public user: any = {}; //User;
    public bar: any = {}; //Bar;
    public battle: any; //Battle;

    constructor(private store: Store<any>) {

    }

    ngOnInit() {
      this.store.map(s => s.userState.user).subscribe(user => {
        this.user = user;
      })
      this.store.map(s => s.barState.bars
        .find(bar => bar.id === s.barState.activeBar)).subscribe(bar => {
        this.bar = bar;
      })
      this.store.map(s => s.battleState.battle).subscribe(battle => {
        this.battle = battle;
      })
    }
}
