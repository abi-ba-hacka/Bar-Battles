import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';

import { AdminPageComponent } from '../+admin/admin.component';
import { ClientPageComponent } from '../+client/client.component';

@Component({
  selector: 'auth-root',
  templateUrl: 'auth.component.html'
})
export class AuthPageComponent {

  FB_APP_ID: number = 1858455974413636;

  constructor(public navCtrl: NavController) {
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
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then((user) => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture,
          id: userId
        })
        .then(() =>{
          this.navCtrl.push(ClientPageComponent);
        }, (error) => {
          console.log(error);
        })
      })
    }, (error) => {
      console.log(error);
    });
  }

  doGhostLogin() {
      console.log("GHOST LOGIN");
  }
}
