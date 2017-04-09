import { NgModule, ErrorHandler  } from '@angular/core';
import {HttpModule} from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { AdminPage } from '../pages/admin/admin';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
 import {HeroProvider} from '../providers/hero';
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    AdminPage,
    HomePage,
    TabsPage,
    DetailsPage
  ],
  imports: [ 
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    AdminPage,
    HomePage,
    TabsPage,
    DetailsPage
  ],
  providers: [
     StatusBar,
    SplashScreen,    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeroProvider,
  ]
})
export class AppModule {}
