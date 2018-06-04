import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';



const DATABASE_FILE_NAME: string = 'data.db';


@IonicPage()
@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html'
})
export class SqlitePage {


  private db: SQLiteObject;
  
  oeuvres = [];
  firstname: string;
  lastname: string;
  code: number;
  photo: string;
  checkmark: string;

  constructor(public platform: Platform, public navCtrl: NavController, private sqlite: SQLite) {

      console.log("SQLite Page launched");
      this.createDatabaseFile();

  }

  private createDatabaseFile(): void {
    console.log("createDatabaseFile function");
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Bdd créée !');
        this.db = db;
        this.createTables();
      })
      .catch(err => console.log("createDatabaseFile", err));
  }

  private createTables(): void {
      this.db.executeSql('CREATE TABLE if not exists `OEUVRES` ( `id` INTEGER PRIMARY KEY, `lastname` TEXT NOT NULL, `firstname` TEXT NOT NULL, `photo` TEXT NOT NULL, `code` INTEGER NOT NULL,  `checkmark` INTEGER)', {})
      .then(() => {
        this.createOeuvres();
        console.log('Table Oeuvres created !');



      })
      .catch(e => console.log('nulll',e));
      
  }
  

//--============================== CREATE OEUVRES ==============================--//

    private createOeuvres(): void {

      this.db.executeSql("INSERT INTO `OEUVRES` VALUES (1,'ALVAREZ','Jean-Pierre','9213750369',9213750369,0)," +
    
      "(2,'ARAI','Poeragni','6510403686',6510403686,0)," +
    
      "(3,'CHANSIN','Jerôme','7216899933',7216899933,0)," +
    
      "(4,'CHEUNG-SEN ','Jonas','1629568455',1629568455,0)," +
    
      "(5,'CUNNY','Heimana','9266553664',9266553664,0)," +
    
      "(6,'EBB','Nicolas','1168085824',1168085824,0)," +
    
      "(7,'LEHARTEL','Alexandre','2791010818',2791010818,0)," +
    
      "(8,'LENOIR','Tetuaoro','4173047359',4173047359,0)," +
    
      "(9,'LONGINE','Manaarii ','9782420312',9782420312,0)," +
    
      "(10,'LY','Joane ','6872232276',6872232276,0)," +
    
      "(11,'MARO','Teremu ','1234567890',1234567890,0)," +
    
      "(12,'MONACO','Vaitare','4653519064',4653519064,0)," +
    
      "(13,'PAEAHI','Ariipaea','3658034121',3658034121,0)," +
    
      "(14,'PAMBRUN','Aito ','5175547403',5175547403,0)," +
    
      "(15,'PAMBRUN','Hiomai','9520532017',9520532017,0)," +
    
      "(16,'PEREZ','Rahiti','1228597258',1228597258,0)," +
    
      "(17,'PERRY','Matihamu ','5480211371',5480211371,0)," +
    
      "(18,'ROUSSEL','Christian ','2462643924',2462643924,0)," +
    
      "(19,'TEHUPE','Tinirau ','5055364030',5055364030,0)," +
    
      "(20,'TEMATAHOTOA','Tinirau ','6232447902',6232447902,0)," +
    
      "(21,'TOOFA','Teparii ','4235066246',4235066246,0);", {})
    
      .then(() => {
        
        console.log('event works created');
        this.retrieveOeuvres();
        
      })
    
        .catch(e => console.log(e, 'No Event'));
      
    }


//--============================== LOAD OEUVRES ==============================--//
  public retrieveOeuvres() {

    this.db.executeSql('SELECT firstname, lastname, code, photo, checkmark FROM `oeuvres`', {})
		.then((data) => {

			if(data == null) {
        console.log("Base de données vide !");
				return;
			}


				if(data.rows.length > 0) {
					for(var i = 0; i < data.rows.length; i++) {
            this.oeuvres.push(data.rows.item(i));
            console.log(data.rows.item(i).lastname);
          }
				}
		});
    
	}

}
