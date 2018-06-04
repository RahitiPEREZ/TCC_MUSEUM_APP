import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SqlitePage } from './sqlite';

@NgModule({
  declarations: [
    SqlitePage,
  ],
  imports: [
    IonicPageModule.forChild(SqlitePage),
  ],
})
export class SqlitePageModule {}
