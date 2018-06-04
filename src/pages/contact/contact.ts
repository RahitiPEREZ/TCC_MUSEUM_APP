
//  * =======================================================================================================================
//  * =================================================== INFORMATIONS PAGE =================================================
//  * =======================================================================================================================


import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InAppBrowser, InAppBrowserOptions, InAppBrowserObject } from '@ionic-native/in-app-browser';


@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class ContactPage {

  url : string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private inAppBrowser: InAppBrowser) {
  }

  openWebpage(url: string) {
    const options : InAppBrowserOptions = {

    }

    // OPEN URL AND RETURN INAPPBROWSEROBJECT
    const browser = this.inAppBrowser.create(url, '_self', options );
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPage--> InformationsPage');
  }
}
