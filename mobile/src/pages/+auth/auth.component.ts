import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from 'ionic-native';

import { AdminPageComponent } from '../+admin/admin.component';
import { ClientPageComponent } from '../+client/client.component';

import { Store } from "@ngrx/store";
import { UserActions } from '../../core/user/user.actions';

@Component({
  selector: 'auth-root',
  templateUrl: 'auth.component.html'
})
export class AuthPageComponent {

  FB_APP_ID: number = 1858455974413636;

  constructor(
    public navCtrl: NavController,
    private store: Store<any>,
  ) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

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

  doFbLogin(){
    let permissions = new Array();
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
    .then((response) => {
      let facebookId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then((user) => {
        user.picture = "https://graph.facebook.com/" + facebookId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.store.dispatch(new UserActions.UserLogin(facebookId));

        this.store.map(store => store.userState).skip(1).take(1).subscribe(userState => {
          if (userState.user) {
            this.navCtrl.push(ClientPageComponent);
          }
        })
        //borrar y editar ClientPage

      })
    }, (error) => {
      console.log(error);
    });
  }

  doGhostLogin() {
      console.log("GHOST LOGIN");
  }
}
