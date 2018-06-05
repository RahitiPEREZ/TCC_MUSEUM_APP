import { Component } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';
import { SqlitePageModule } from '../sqlite/sqlite.module';
import { SqlitePage } from '../sqlite/sqlite';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// 
// * =======================================================================================================================
// * =======================================================================================================================
// * =================================================== SCANNER PAGE TS=================================================
// * =======================================================================================================================
// * =======================================================================================================================
//  

@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  results: {}; optionsScanner: BarcodeScannerOptions

  optionsBrowser: InAppBrowserOptions = {

    closebuttoncaption: 'Close',

  }
  private fixedURL: string = 'http://tcc.1click.pf/museum/index.php?mat=T910QKN5S4&oeuvre=';

  public scannedData: any;
  


  constructor(public sqliteService: SqlitePage,  public navParams: NavParams, public barcodeScanner: BarcodeScanner, public appCtrl: App, private inAppBrowser: InAppBrowser) {

  } 
  
  ionViewWillEnter() {
    this.scan();
  }

  scan() {

    this.optionsScanner = {

      prompt: "Please scan your code"

    };
    this.barcodeScanner.scan(this.optionsScanner)
      .then(barcodeData => {

        if (barcodeData.cancelled == true) {

          this.appCtrl.getRootNavs()[0].push('SqlitePage');
          this.appCtrl.getRootNavs()[0].push('TabsPage');

        } else {
          this.scannedData = barcodeData.text;
        
          console.log('Scanned code: ', this.scannedData);
         
          this.oeuvresPage();
        }
      })


      .catch(err => {
        console.log('Error', err);
      });
  }

 

  private oeuvresPage(): void {

    let target = "_blank";

    let URL = this.fixedURL + this.scannedData

    this.inAppBrowser.create(URL, target, this.optionsBrowser);

    console.log('URL: ' + this.fixedURL + this.scannedData);
    this.statutUpdate(); 
    this.refreshMe();

  }

  public statutUpdate(): any {
    console.log('"Statut" avant');
    this.sqliteService.db.executeSql("UPDATE 'OEUVRES' SET checkmark='md-checkmark-circle-outline' WHERE code="+this.scannedData, {})
      .then(() => {
        console.log('"Statut" updated');
      })
      .catch(err => {
        console.log('Erreur requete', err);
      })
  } 

  public refreshMe() {

    this.appCtrl.getRootNavs()[0].push('SqlitePage');
    this.appCtrl.getRootNavs()[0].push('TabsPage');

  }
}
