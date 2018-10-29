import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { SQLiteObject, SQLite } from '@ionic-native/sqlite';

/*
  Generated class for the SqliteHelperProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SqliteHelperService {

  private db: SQLiteObject;

  constructor(public platform: Platform, public sqlite: SQLite) { }

  private createDataBase(dbName?: string): Promise<SQLiteObject> {
    return this.platform.ready().then((readySource: string) => {
      return this.sqlite.create({
        name: dbName || 'nativeIonic.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.db = db;
        return this.db;
      });
    });
  }

  getDb(dbName?: string, newOpen?: boolean) : Promise<SQLiteObject> {
    if(newOpen){
      return this.createDataBase(dbName);
    }else{
      return (this.db) ? Promise.resolve(this.db) : this.createDataBase(dbName);
    }
  }
}
