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
  private splashScreen: boolean = true;

  adminPages: Array<{name: string, component: any}>;
  clientPages: Array<{name: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar,
              splashScreen: SplashScreen,
              public menuCtrl: MenuController,
              private store: Store<any>) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      /*setTimeout(() => {
          this.closeSplash();
      }, 13000);*/
    });

    this.adminPages = [
      {name: 'Bar Estadisticas', component: BarStatsPageComponent},
      {name: 'Battle Tab', component: BattleTabPageComponent},
      {name: 'Descuentos', component: DiscountsPageComponent},
      {name: 'Objetivos', component: GoalsPageComponent},
      {name: 'Premios', component: BattleTabPageComponent},
      {name: 'Canjear Codigo', component: BattleTabPageComponent},
      {name: 'Generar Codigo', component: QRGeneratorPageComponent},
    ]
  }

  closeSplash() {
      console.log("CLOSE SPLASH");
      this.splashScreen = false;
      this.hasUser();
  }

  hasUser() {
    NativeStorage.getItem('user')
    .then((data) => {
      this.nav.push(ClientPageComponent);
    }, (error) => {
      this.nav.push(LoginPageComponent);
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
