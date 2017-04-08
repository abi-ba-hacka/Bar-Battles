import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController, MenuController } from 'ionic-angular';
import { ClientPageComponent } from '../../+client/client.component';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})

export class LoginPageComponent {

  FB_APP_ID: number = 1858455974413636;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
  ) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
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

  ionViewDidEnter() {
      this.menuCtrl.enable(false, 'admin-menu');
      this.menuCtrl.enable(false, 'client-menu');
  }



}
