import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseAuth } from '@angular/fire';

@Injectable()
export class AuthService {

  constructor(public http: HttpClient, public firebaseAuth: FirebaseAuth) {
    console.log('Hello AuthProvider Provider');
  }

  createAuthUser(email: string, password: string): Promise<any>{
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        resolve(res);
      }, err => reject(err))
    });
  }
}
