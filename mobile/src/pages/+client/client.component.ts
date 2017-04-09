import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { BarcodeData } from '../barcode';
import { UserActions } from '../../core/user/user.actions';

import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPageComponent } from '../+auth/+login/login.component';

import * as CryptoJS from "crypto-js";

import { Store } from '@ngrx/store';

@Component({
  selector: 'client-root',
  templateUrl: 'client.component.html'
})
export class ClientPageComponent {

  user: any;
  userReady: boolean = false;

  public tab: string = 'bar';

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private store: Store<any>
  ) { }

  ionViewCanEnter(){
    console.log('entro');
    NativeStorage.getItem('user')
    .then((data) => {
      this.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture,
        id: data.id
      };
        this.userReady = true;
    }, (error) => {
      console.log('no user logged');
      console.log(error); // no user logged
      this.store.dispatch(new UserActions.GetUser('1'))
    });
  }

  ionViewDidEnter() {
      this.menuCtrl.enable(false, 'admin-menu');
      this.menuCtrl.enable(true, 'client-menu');
  }

  scan() {
    BarcodeScanner.scan()
      .then((result) => {
      if (!result.cancelled) {
        const barcodeData = new BarcodeData(result.text, result.format);
        // TODO Should be
        // this.decryptedText = EncriptionService.decrypt(barcodeData.text);
      }
      })
      .catch((err) => {
        alert(err);
      })
  }

  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then((response) => {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPageComponent);
    }, (error) => {
      console.log(error);
    });
  }

  test() {
      this.navCtrl.push(LoginPageComponent);
  }


}
