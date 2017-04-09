import { Component } from '@angular/core';

@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html'
})

export class ProfileTabComponent {

    redeemPoints() {
        console.log("REDEEM POINTS");
    }
}
