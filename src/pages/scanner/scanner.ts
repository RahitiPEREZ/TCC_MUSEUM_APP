import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-scanner',
  templateUrl: 'scanner.html',
})
export class ScannerPage {

  data={ };
  option: BarcodeScannerOptions;
  constructor(public navCtrl: NavController, public navParams: NavParams, public barcodeScanner:BarcodeScanner) {
  }
  ionViewWillEnter(){
    this.scan();
  }
  scan(){

    this.option = {
     
      prompt: "Please scan your code"
    }
    this.barcodeScanner.scan(this.option).then(barcodeData => {
      if (barcodeData.cancelled) {
        this.navCtrl.parent.select(0);
      }
      console.log('Barcode data', barcodeData);

     }).catch(err => {
         console.log('Error', err);
     });
  }

}


