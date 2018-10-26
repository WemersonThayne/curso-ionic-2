import { FirebaseAuth } from '@angular/fire';
import { User } from './../../models/user.model';
import { AuthService } from './../../providers/auth/auth.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './../../providers/user/user.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  singupForm: FormGroup;
  user: User;
  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, private userService: UserService, private authService: AuthService) {

    this.singupForm = this.formBuilder.group({
      name: ['',[Validators.required,Validators.minLength(3), Validators.maxLength(25)]],
      userName: ['',[Validators.required,Validators.minLength(3)]],
      email: ['',[Validators.required]],
      password: ['',[Validators.required,Validators.minLength(6)]],
    });

  }

  signUp(): void{
    console.log(this.singupForm.value);    
    this.user = this.singupForm.value;
    this.authService.createAuthUser(this.user.email, this.user.password).then((authState: FirebaseAuth) =>{
      this.userService.create(this.singupForm.value).then(() => {
        console.log('Cadastrado com Sucesso');
      });
    });
  }
}
