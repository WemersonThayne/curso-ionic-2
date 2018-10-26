import { User } from './../../models/user.model';
import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../../providers/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public users: User[];

  constructor(public navCtrl: NavController, public userService: UserService) {
    
  }

  // ionViewCanEnter(): Observable<any>{
  //   return this.userService.getAll().subscribe(users => {
  //     this.users = users;
  //   });
  // }

  onSignup(): void {
    this.navCtrl.push(SignupPage);
  }

  onChatCreate(user: User): void{

  }
}
