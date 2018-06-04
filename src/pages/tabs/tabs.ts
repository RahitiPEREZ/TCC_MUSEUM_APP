import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { SqlitePage } from '../sqlite/sqlite';

import { ContactPage } from '../contact/contact';
import { ScannerPage } from '../scanner/scanner';



@IonicPage( { name: 'TabsPage' } )
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  sqlitePage = SqlitePage;
  contactPage = ContactPage;
  scannerPage = ScannerPage;
}