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

  public tab: string = 'profile';

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    private store: Store<any>
  ) { }

  ionViewCanEnter(){
    console.log('entro');
    this.store.map(s => s.userState).take(1).subscribe(userState => {
      if (!userState.user) {
        this.store.dispatch(new UserActions.GetUser('1'))
      }
    })

  }

  ionViewDidEnter() {
      this.menuCtrl.enable(false, 'admin-menu');
      this.menuCtrl.enable(true, 'client-menu');
  }

  scan() {
    BarcodeScanner.scan()
      .then((result) => {
      if (!result.cancelled) {
        let id: any;
        const barcodeData = new BarcodeData(result.text, result.format);
        this.store.take(1).subscribe(store => {
          id = store.userState.user.id;
        })
        this.store.dispatch(new UserActions.SendQR({id: id, qrcode: result.text}))

      }
      })
      .catch((err) => {
        alert(err);
      })
  }

  onScan(data: any) {
      this.scan();
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
