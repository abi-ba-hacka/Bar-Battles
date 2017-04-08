import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { StoreModule } from '@ngrx/store';
import { reducer } from '../core/app.reducer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthPageComponent } from '../pages/+auth/auth.component';
import { LoginPageComponent } from '../pages/+auth/+login/login.component';

import { ClientPageComponent } from '../pages/+client/client.component';

import { AdminPageComponent } from '../pages/+admin/admin.component';
import { BarStatsPageComponent } from '../pages/+admin/bar-stats/bar-stats.component';
import { BattleTabPageComponent } from '../pages/+admin/battle-tab/battle-tab.component';
import { DiscountsPageComponent } from '../pages/+admin/discounts/discounts.component';
import { GoalsPageComponent } from '../pages/+admin/goals/goals.component';
import { QRGeneratorPageComponent } from '../pages/+admin/qr-generator/qr-generator.component';

@NgModule({
  declarations: [
    MyApp,
    AuthPageComponent,
    LoginPageComponent,

    ClientPageComponent,

    AdminPageComponent,
    BarStatsPageComponent,
    BattleTabPageComponent,
    DiscountsPageComponent,
    GoalsPageComponent,
    QRGeneratorPageComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(reducer)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPageComponent,
    AuthPageComponent,

    ClientPageComponent,

    AdminPageComponent,
    BarStatsPageComponent,
    BattleTabPageComponent,
    DiscountsPageComponent,
    GoalsPageComponent,
    QRGeneratorPageComponent,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
