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

    @Output() scan: EventEmitter<any> = new EventEmitter();
    constructor(private store: Store<any>) {

    }

    ngOnInit() {
      this.store.map(s => s).subscribe(s => {
        this.user = s.userState.user;
        this.bar = s.barState.bars.find(bar => bar.id === s.barState.activeBar);
        this.battle = s.battleState.battle;
        if (s.battleState.battle) {
          this.rivalBar = s.battleState.battle.bars.find(id => id != s.barState.activeBar);
        }
      });
    }
}
