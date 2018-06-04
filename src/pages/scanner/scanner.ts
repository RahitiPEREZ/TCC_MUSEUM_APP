import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';

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

  private scannedData: any; constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner: BarcodeScanner, public appCtrl: App, private inAppBrowser: InAppBrowser) {

  } ionViewWillEnter() {

    this.scan();
  }

  scan() {

    this.optionsScanner = {

      prompt: "Please scan your code"

    };
    this.barcodeScanner.scan(this.optionsScanner)
      .then(barcodeData => {

        if (barcodeData.cancelled == true) {

          this.navCtrl.parent.select(0);

        } else {
          this.scannedData = barcodeData.text;
          this.oeuvresPage();
          console.log('Scanned code: ', this.scannedData);

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

     if (this.optionsBrowser.closebuttoncaption) this.refreshMe();

  }
   public refreshMe() {

     this.appCtrl.getRootNavs()[0].push('SqlitePage');
     this.appCtrl.getRootNavs()[0].push('TabsPage');
 
  }
}
