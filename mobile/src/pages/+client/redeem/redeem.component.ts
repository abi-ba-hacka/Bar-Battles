import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'redeem',
  templateUrl: './redeem.component.html',
})

export class RedeemComponent implements OnInit {

    public user: any = {}; //User;
    public bar: any = {}; //Bar;

    constructor(private store: Store<any>) {

    }

    ngOnInit() {
      this.store.map(s => s.userState.user).subscribe(user => {
        this.user = user;
      })
    }

}
