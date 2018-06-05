import { Component } from '@angular/core';
import { IonicPage, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

// 
// * =======================================================================================================================
// * =======================================================================================================================
// * =================================================== LIST PAGE TS =========================================================
// * =======================================================================================================================
// * =======================================================================================================================
// 


const DATABASE_FILE_NAME: string = 'data.db';


@IonicPage()
@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html'
})
export class SqlitePage {
  splash = true;
  tabBarElement: any;

  public db: SQLiteObject;

  oeuvres = [];
  firstname: string;
  lastname: string;
  code: number;
  photo: string;
  checkmark: string;


  public oeuvresVu: any;
  public totalOeuvres: any;

  constructor(public platform: Platform, private sqlite: SQLite) {
    this.tabBarElement = document.querySelector('.tabbar');

    console.log("SQLite Page launched");

    platform.ready()
      .then(() => {
        this.createDatabaseFile();
       
      });
  }

  ionViewDidLoad() {
    this.tabBarElement.style.display = 'none';
    setTimeout(() => {
      this.splash = false;
      this.tabBarElement.style.display = 'flex';
    }, 4000);
  }


  // fonction création bdd
  public createDatabaseFile(): void {
    console.log("createDatabaseFile function");
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créée !');
        this.db = db;
        this.createTables();
        this.getTotalOeuvres();
       

      })
      .catch(err => console.log("createDatabaseFile", err));
  }

  // fonction création table "oeuvres"
  public createTables(): void {
    this.db.executeSql('CREATE TABLE if not exists `OEUVRES` ( `id` INTEGER PRIMARY KEY, `lastname` TEXT NOT NULL, `firstname` TEXT NOT NULL, `photo` TEXT NOT NULL, `code` INTEGER NOT NULL,  `checkmark` TEXT )', {})
      .then(() => {
        this.createOeuvres();
        this.getOeuvresVu();
        this.retrieveOeuvres();
        console.log('Table Oeuvres created !');
      



      })
      .catch(e => console.log('nulll', e));

  }

  //Code teremu :
    private dropTables(): void {

      this.db.executeSql('DROP TABLE `OEUVRES`', {})

      .then(() => {

        console.log('Table Oeuvres dropped !');

      })

      .catch(e => console.log('nulll',e));

  }



  //--============================== CREATE OEUVRES ==============================--//
  public createOeuvres(): void {

    this.db.executeSql("INSERT INTO `OEUVRES` VALUES (1,'ALVAREZ','Jean-Pierre','9213750369',9213750369, 'md-radio-button-off')," +

      "(2,'ARAI','Poeragni','6510403686',6510403686, 'md-radio-button-off')," +

      "(3,'CHANSIN','Jerôme','7216899933',7216899933, 'md-radio-button-off')," +

      "(4,'CHEUNG-SEN ','Jonas','1629568455',1629568455, 'md-radio-button-off')," +

      "(5,'CUNNY','Heimana','9266553664',9266553664, 'md-radio-button-off')," +

      "(6,'EBB','Nicolas','1168085824',1168085824, 'md-radio-button-off')," +

      "(7,'LEHARTEL','Alexandre','2791010818',2791010818, 'md-radio-button-off')," +

      "(8,'LENOIR','Tetuaoro','4173047359',4173047359, 'md-radio-button-off')," +

      "(9,'LONGINE','Manaarii ','9782420312',9782420312, 'md-radio-button-off')," +

      "(10,'LY','Joane ','6872232276',6872232276, 'md-radio-button-off')," +

      "(11,'MARO','Teremu ','1234567890',1234567890, 'md-radio-button-off')," +

      "(12,'MONACO','Vaitare','4653519064',4653519064, 'md-radio-button-off')," +

      "(13,'PAEAHI','Ariipaea','3658034121',3658034121, 'md-radio-button-off')," +

      "(14,'PAMBRUN','Aito ','5175547403',5175547403, 'md-radio-button-off')," +

      "(15,'PAMBRUN','Hiomai','9520532017',9520532017, 'md-radio-button-off')," +

      "(16,'PEREZ','Rahiti','1228597258',1228597258, 'md-radio-button-off')," +

      "(17,'PERRY','Matihamu ','5480211371',5480211371, 'md-radio-button-off')," +

      "(18,'ROUSSEL','Christian ','2462643924',2462643924, 'md-radio-button-off')," +

      "(19,'TEHUPE','Tinirau ','5055364030',5055364030, 'md-radio-button-off')," +

      "(20,'TEMATAHOTOA','Tinirau ','6232447902',6232447902, 'md-radio-button-off')," +

      "(21,'TOOFA','Teparii ','4235066246',4235066246, 'md-radio-button-off');", {})

      .then(() => {
        console.log('event works created');
      })
      .catch(e => console.log(e, 'No Event'));
  }


  //--============================== LOAD OEUVRES ==============================--//
  public retrieveOeuvres() {

    this.db.executeSql('SELECT lastname, firstname, code, photo, checkmark FROM `oeuvres`', {})
      .then((data) => {

        if (data == null) {
          console.log("Base de données vide !");
          return;
        }


        if (data.rows.length > 0) {
          for (var i = 0; i < data.rows.length; i++) {
            this.oeuvres.push(data.rows.item(i));
            console.log(data.rows.item(i).lastname);
          }
        }
      });

  }


  //Compte les oeuvres vues
  public getOeuvresVu(): void {
    this.db.executeSql('SELECT COUNT(checkmark) AS counted FROM `oeuvres` WHERE oeuvres.checkmark="md-checkmark-circle-outline"', {})
      .then((data) => {
        console.log('Oeuvres vu: ' + data.rows.item(0).counted);
        this.oeuvresVu = data.rows.item(0).counted;
      })
  }

  //Compte le nombre total d'oeuvres
  public getTotalOeuvres(): void {
    this.db.executeSql('SELECT COUNT(id) AS total FROM `oeuvres`', {})
      .then((data) => {
        console.log('Total: ' + data.rows.item(0).total);
        this.totalOeuvres = data.rows.item(0).total;
      })
  }

}
