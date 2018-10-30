import { SqliteHelperService } from './../sqlite-helper/sqlite-helper.service';
import { SQLiteObject } from '@ionic-native/sqlite';
import { Injectable } from '@angular/core';

import { Movie } from '../../models/movie.model';

@Injectable()
export class MovieService {

  private db: SQLiteObject;
  private isFirstCall: boolean = true;

  constructor(public sqliteHelperService: SqliteHelperService) {
  }

  private getDb(): Promise<SQLiteObject> {
    if (this.isFirstCall) {
      this.isFirstCall = false;
      return this.sqliteHelperService.getDb('ionicSqlite.db').then((db: SQLiteObject) => {
        this.db = db;
        this.db.executeSql('CREATE TABLE IF NOT EXISTS movie(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)')
          .then((sucess) => console.log('Movie table created sucessfully!', sucess))
          .catch((error) => console.log('Error or created table: ', JSON.stringify(error)));
        return this.db;
      });
    }

    return this.sqliteHelperService.getDb();
  }

  getAll(order?: string): Promise<Movie[]> {
    return this.getDb().then((db: SQLiteObject) => {
      return <Promise<Movie[]>>this.db.executeSql(`SELECT * FROM movie ORDER BY id${order || 'DESC'}`).then(resultSet => {
        let list: Movie[] = [];
        resultSet.rows.forEach(element => {
          list.push(element.item());
        });
        return list;
      }).catch(error => console.log('Error executer methed getAll: ' + error));
    });
  }

  create(movie: Movie): Promise<Movie> {
    return this.getDb().then((db: SQLiteObject) => {
      return <Promise<Movie>>this.db.executeSql('INSERT INTO movie(title) VALUES (?)', [movie.title])
        .then(resultSet => {
          movie.id = resultSet.insertId;
          return movie;
        }).catch(error => {
          console.log(`Error creating ${movie.title} movie!`, error);
        });
    });  
  }

  update(movie: Movie): Promise<boolean> {
    return this.getDb().then((db: SQLiteObject) => {
      return <Promise<boolean>>this.db.executeSql('UPDATE movie SET title=? WHERE id=?', [movie.title, movie.id])
        .then(resultSet => {
          return resultSet.rowsAffected >= 0;
        }).catch(error => {
          console.log(`Error updating ${movie.title} movie!`, error);
        });
    });
  }

  delete(id: number): Promise<boolean> {
    return this.getDb().then((db: SQLiteObject) => {
      return <Promise<boolean>>this.db.executeSql('DELETE FROM movie WHERE id=?', [id])
        .then(resultSet => {
          return resultSet.rowsAffected >= 0;
        }).catch(error => {
          console.log(`Error deleting movie with id ${id}!`, error);
        });
    });
  }

  getById(id: number): Promise<Movie> {
    return this.getDb().then((db: SQLiteObject) => {
      return <Promise<Movie>>this.db.executeSql(`SELECT * FROM movie WHERE id=?`, [id]).then(resultSet => {
        return  resultSet.rows.item(0);
      }).catch(error => console.log('Error executer methed getAll: ' + error));
    });
  }

}
