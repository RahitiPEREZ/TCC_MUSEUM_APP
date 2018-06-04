import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME : string = 'data.db';

@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class AboutPage {

  private db: SQLiteObject;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlite:SQLite, public splashScreen: SplashScreen) {
    
  }
  
}

