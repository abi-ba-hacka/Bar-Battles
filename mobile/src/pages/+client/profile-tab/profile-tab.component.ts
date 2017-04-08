import { Component } from '@angular/core';

@Component({
  selector: 'profile-tab',
  templateUrl: './profile-tab.component.html'
})

export class ProfileTabComponent {

    shareOnFacebook() {
        console.log("SHARE ON FACEBOOK");
    }
}
