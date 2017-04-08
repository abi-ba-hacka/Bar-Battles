import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { BarcodeData } from '../barcode';

import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPageComponent } from '../+auth/+login/login.component';

import * as CryptoJS from "crypto-js";

import { Store } from '@ngrx/store';

@Component({
  selector: 'client-root',
  templateUrl: 'client.component.html'
})
export class ClientPageComponent {

  data: any;

  text: string;
  encryptedText: string;
  decryptedText: string;

  key: string = "banana12345";

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
      console.log(error); // no user logged
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
        this.data = barcodeData;
        this.decryptedText = this.decrypt(this.data.text);
        // TODO Should be
        // this.decryptedText = EncriptionService.decrypt(this.data.text);
      }
      })
      .catch((err) => {
        alert(err);
      })
  }

  encrypt(data: any) {
      let encrypted = CryptoJS.AES.encrypt(data, this.key).toString();
      console.log("encrypted");
      console.log(encrypted);
      return encrypted;
  }

  decrypt(data: any) {
      let decrypted = CryptoJS.AES.decrypt(data, this.key).toString(CryptoJS.enc.Utf8);
      console.log("decrypted");
      console.log(decrypted);
      return decrypted;
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


}
