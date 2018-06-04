import { Component } from '@angular/core';

import { SqlitePage } from '../sqlite/sqlite';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { ScannerPage } from '../scanner/scanner';


@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  sqlitePage = SqlitePage;
  aboutPage = AboutPage;
  contactPage = ContactPage;
  scannerPage = ScannerPage;
}