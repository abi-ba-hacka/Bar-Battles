import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';


import { QRCodeModule } from 'angular2-qrcode';
import { CoreModule } from '../core/core.module';

import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../core/user/user.effects';
import { BattleEffects } from '../core/battle/battle.effects';
import { BarEffects } from '../core/bar/bar.effects';


import { StoreModule } from '@ngrx/store';
import { reducer } from '../core/app.reducer';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthPageComponent } from '../pages/+auth/auth.component';
import { LoginPageComponent } from '../pages/+auth/+login/login.component';

import { ClientPageComponent } from '../pages/+client/client.component';
import { ProfileTabComponent } from '../pages/+client/profile-tab/profile-tab.component';
import { BarTabComponent } from '../pages/+client/bar-tab/bar-tab.component';

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
    ProfileTabComponent,
    BarTabComponent,

    AdminPageComponent,
    BarStatsPageComponent,
    BattleTabPageComponent,
    DiscountsPageComponent,
    GoalsPageComponent,
    QRGeneratorPageComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    CoreModule,
    QRCodeModule,
    IonicModule.forRoot(MyApp),
    StoreModule.provideStore(reducer),
    EffectsModule.run(UserEffects),
    EffectsModule.run(BattleEffects),
    EffectsModule.run(BarEffects),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPageComponent,
    AuthPageComponent,

    ClientPageComponent,
    ProfileTabComponent,
    BarTabComponent,

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
