import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';

import { User } from '../../core/user/user.model';
import { Bar } from '../../core/bar/bar.model';

@Component({
  selector: 'bar-tab',
  templateUrl: './bar-tab.component.html'
})

export class BarTabComponent implements OnInit{

    public user: any = {}; //User;
    public bar: any = {}; //Bar;
    public rivalBar: any = {}; //Bar;
    public battle: any; //Battle;
    public battleStarted: boolean = false;

    @Output() scan: EventEmitter<any> = new EventEmitter();
    constructor(private store: Store<any>) {

    }

    ngOnInit() {
      this.store.map(s => s).subscribe(s => {
        this.user = s.userState.user;
        this.bar = s.barState.bars.find(bar => bar.id === s.barState.activeBar);
        this.battle = s.battleState.battle;
        if (s.battleState.battle) {
          this.rivalBar = s.barState.bars.filter(bar => bar.id !== s.barState.activeBar)[0];
          console.log('this.rivalBar');
          console.log(this.rivalBar);
          this.battleStarted = true;
        } else {
          this.battleStarted = false;
        }
      });
    }

    toggleBattle() {
      this.battleStarted = !this.battleStarted;
    }
}
