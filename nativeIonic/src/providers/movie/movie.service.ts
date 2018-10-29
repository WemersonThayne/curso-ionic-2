import { SqliteHelperService } from './../sqlite-helper/sqlite-helper.service';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie.model';

/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(public sqliteHelperService: SqliteHelperService) {
  }

  private getDb(): Promise<SQLiteObject> {
    if(this.isFirstCall){
      this.isFirstCall = false;
      return this.sqliteHelperService.getDb('ionicSqlite.db').then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('CREATE TABLE IF NOT EXISTS movie(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)')
               .then((sucess) => console.log('Movie table created sucessfully!', sucess))
               .catch((error) => console.log('Error or created table: ', error));

        return this.db;
      });
    }

    return this.sqliteHelperService.getDb();
  }


  getAll(order?: string) :Promise<Movie[]> {

    return this.getDb().then((db: SQLiteObject) =>{

        return <Promise<Movie[]>> this.db.executeSql(`SELECT * FROM movie ORDER BY id${order || 'DESC'}`, {}).then( resultSet =>{
              let list: Movie[] = [];
              resultSet.rows.forEach(element => {
                list.push(element.item());
              });   

              return list;
        }).catch(error => console.log('Error executer methed getAll: '+ error));
    });
  }

  create(movie: Movie): Promise<Movie> {
    return this.getDb().then((db: SQLiteObject) =>{
      return <Promise<Movie>> this.db.executeSql('INSERT INTO movie(title) VALUES (?)',[movie.title])
                                     .then(resultSet => {
                                       movie.id = resultSet.insertId;
                                       return movie;
                                     }).catch(error => {
                                          console.log(`Error creating ${movie.title} movie!`, error);
                                     });
    });
  
  }












}
