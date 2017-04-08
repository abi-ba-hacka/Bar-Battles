import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { NativeStorage } from 'ionic-native';

import { AuthPageComponent } from '../pages/+auth/auth.component';


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
