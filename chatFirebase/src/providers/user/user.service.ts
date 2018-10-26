import { AngularFireDatabase } from 'angularfire2/database';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private baseUrl = '/users';

  constructor(public http: HttpClient, public db: AngularFireDatabase) {
  }

  getAll(): Observable<User[]> {
    return this.db.list<User>(this.baseUrl).valueChanges();
  }

  create(user: User): Promise<any> {
    // return this.db.list(this.baseUrl).push(user);
    return new Promise((resolve, reject) => {
      // if (user.key) {
      //   this.db.list(this.baseUrl)
      //     .update(user.key, { name: user.name, tel: user.tel })
      //     .then(() => resolve())
      //     .catch((e) => reject(e));
      // } else {
      this.db.list(this.baseUrl)
        .push(user)
        .then(() => resolve());
      //}
    })


  }

}
