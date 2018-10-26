import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { UserService } from './../providers/user/user.service';
import { AuthService } from './../providers/auth/auth.service';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FirebaseAppConfig, AngularFireModule } from '@angular/fire';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from '../pages/signup/signup';


const firebaseAppConfig: FirebaseAppConfig   = {
  apiKey: "AIzaSyBzKYUChitfvNI6vETGm4qjMcfYCvVByBs",
  authDomain: "ionic-chat-463f1.firebaseapp.com",
  databaseURL: "https://ionic-chat-463f1.firebaseio.com",
  storageBucket: "ionic-chat-463f1.appspot.com",
  messagingSenderId: "187578960840"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseAppConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserService,
    AuthService
  ]
})
export class AppModule {}
