import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
//angular

import { AngularFireModule } from '@angular/fire/compat';   // MODIFICAR

import { environment } from 'src/environments/environment'; 

import { AngularFirestoreModule }  from '@angular/fire/compat/firestore/';  // MODIFICAR

//import { AngularFireAuthModule } from '@angular/fire/auth';        // anteruor

import { AngularFireAuthModule } from '@angular/fire/compat/auth';  // MODIFICAR

//import { provideAuth,getAuth } from '@angular/fire/auth';
import { HttpClientModule } from '@angular/common/http';

//para ftos 
import { AngularFireStorageModule } from '@angular/fire/compat/storage';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    HttpClientModule ,
    AngularFireStorageModule
   // provideAuth(()=>getAuth())
  ],

  providers: [
    { 
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy,
    
  } ],
  bootstrap: [AppComponent],
})
export class AppModule {}

