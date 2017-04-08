import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from 'ionic-native';

import { AuthPageComponent } from '../pages/+auth/auth.component';
import { LoginPageComponent } from '../pages/+auth/+login/login.component';

// pages
import { ClientPageComponent } from '../pages/+client/client.component';
import { BarStatsPageComponent } from '../pages/+admin/bar-stats/bar-stats.component';
import { BattleTabPageComponent } from '../pages/+admin/battle-tab/battle-tab.component';
import { DiscountsPageComponent } from '../pages/+admin/discounts/discounts.component';
import { GoalsPageComponent } from '../pages/+admin/goals/goals.component';
import { QRGeneratorPageComponent } from '../pages/+admin/qr-generator/qr-generator.component';

import { Store } from '@ngrx/store';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('sidemenu') nav;
  rootPage:any = AuthPageComponent;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              private store: Store<any>) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      NativeStorage.getItem('user')
      .then((data) => {
        this.nav.push(ClientPageComponent);
        splashScreen.hide();
      }, (error) => {
        this.nav.push(LoginPageComponent);
        splashScreen.hide();
      });

      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goToPage() {
    this.nav.push(AuthPageComponent);
  }

  goToPage2(pages) {
    this.nav.push(pages.component);
    this.menuCtrl.close();
  }
}
