import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AdminPageComponent } from '../+admin/admin.component';
import { ClientPageComponent } from '../+client/client.component';

@Component({
  selector: 'auth-root',
  templateUrl: 'auth.component.html'
})
export class AuthPageComponent {

  constructor(public navCtrl: NavController) { }

  goToAdminPage() {
    // We need to set the animation manually because we
    // are using .setRoot (so its the new rootPage) and not pushPage
    this.navCtrl.setRoot(
      AdminPageComponent,
      {}, {animate: true, direction: "forward"}
    );
  }
  goToClientPage() {
    this.navCtrl.setRoot(
      ClientPageComponent,
      {}, {animate: true, direction: "forward"}
    );
  }
}
