import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Store } from '@ngrx/store';

import { User } from '../../core/user/user.model';
import { Bar } from '../../core/bar/bar.model';

import { RedeemComponent } from '../redeem/redeem.component';

@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html'
})

export class ProfileTabComponent implements OnInit {

    public user: any = {}; //User;
    public bar: any = {}; //Bar;
    public activeBar: any = {}; //Bar

    constructor(public navCtrl: NavController,
                private store: Store<any>) {

    }

    ngOnInit() {
      this.store.map(s => s.userState.user).subscribe(user => {
        this.user = user;
      })
      this.store.map(s => s.barState.bars.find(bar => bar.id === s.barState.activeBar)).subscribe(bar => {
        this.bar = bar;
      })
      this.store.subscribe(s => {
        this.activeBar = s.barState.activeBar;
      })

    }

    redeemPoints() {
        this.navCtrl.push(RedeemComponent);
    }
}
