import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { Platform, ActionSheetController } from 'ionic-angular';
import { ClientPageComponent } from '../+client/client.component';

import { Store } from '@ngrx/store';
import { UserActions } from '../../core/user/user.actions';



@Component({
  selector: 'admin-root',
  templateUrl: './admin.component.html'
})

export class AdminPageComponent {

  content: any;
  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public platform: Platform,
    public actionsheetCtrl: ActionSheetController,
    private store: Store<any>,
  ) {

  }

  ionViewDidEnter() {
    console.log('asdasd');
    this.menuCtrl.enable(false, 'client-menu');
    this.menuCtrl.enable(true, 'admin-menu');
  }

  testNav() {
    this.navCtrl.push(ClientPageComponent);
  }

  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Albums',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            console.log('Delete clicked');
          }
        },
        {
          text: 'Share',
          icon: !this.platform.is('ios') ? 'share' : null,
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Play',
          icon: !this.platform.is('ios') ? 'arrow-dropright-circle' : null,
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Favorite',
          icon: !this.platform.is('ios') ? 'heart-outline' : null,
          handler: () => {
            console.log('Favorite clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel', // will always sort to be on the bottom
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

}
