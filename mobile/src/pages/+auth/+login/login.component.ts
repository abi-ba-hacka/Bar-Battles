import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController, MenuController } from 'ionic-angular';
import { ClientPageComponent } from '../../+client/client.component';
import { Store } from '@ngrx/store';
import { UserActions } from '../../../core/user/user.actions';
import { UserService } from '../../../core/user/user.service';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html'
})

export class LoginPageComponent {

  FB_APP_ID: number = 1858455974413636;

  constructor(
    private navCtrl: NavController,
    private menuCtrl: MenuController,
    private store: Store<any>,
    private userService: UserService,
  ) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  doFakeFbLogin() {
    this.store.dispatch(new UserActions.UserLogin('123'));
  }

  editUserFake() {
    let edit = {
      name: 'piononono'
    }
    let id;
    this.store.map(store => store.userState.user.id).take(1).subscribe(userId => {
      id = userId;
    })
    this.store.dispatch(new UserActions.EditUser({id: id, data: edit}))
  }

  fakeScan() {
    this.userService.encrypt({barId: '1', beerId: '1'}).subscribe(res => {
      console.log('res');
      console.log(res);
      let id;
      this.store.take(1).subscribe(store => {
        id = store.userState.user.id;
      })
      this.store.dispatch(new UserActions.SendQR({id: id, qrcode: res.data}))
    })
  }

  getUsers() {
    let barId;
    let userId;
    this.store.take(1).subscribe(store => {
      barId = store.barState.activeBar;
      userId = store.userState.user.id;
    })
    this.store.dispatch(new UserActions.GetUsers({badId: barId, userId: userId}))
  }

  doFbLogin(){
    let permissions = new Array();
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];


    Facebook.login(permissions)
    .then((response) => {
      let accessToken = response.authResponse.accessToken;
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then((user) => {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        this.store.dispatch(new UserActions.UserLogin(userId));

        //borrar y editar ClientPage
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

  ionViewDidEnter() {
      this.menuCtrl.enable(false, 'admin-menu');
      this.menuCtrl.enable(false, 'client-menu');
  }



}
