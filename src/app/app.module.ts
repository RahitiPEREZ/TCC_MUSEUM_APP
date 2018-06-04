import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { InAppBrowser } from '@ionic-native/in-app-browser'

import { SqlitePageModule } from '../pages/sqlite/sqlite.module';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { ScannerPage } from '../pages/scanner/scanner';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { SQLite } from '@ionic-native/sqlite';
import { TabsPageModule } from '../pages/tabs/tabs.module';


@NgModule({
  declarations: [
    MyApp,
    ContactPage,
    ScannerPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    SqlitePageModule,
    TabsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ContactPage,
    TabsPage,
    ScannerPage,
   
  ],
  providers: [
    SQLite,
    BarcodeScanner,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    InAppBrowser
  ]
})
export class AppModule {}
