import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SharedDataService } from '../shared/shared-data-service';


import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { TestPage } from '../pages/test/test';
import { ResultPage } from '../pages/result/result';
import { ProfileComponent } from '../pages/profile/profile.component';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TestPage,
    ResultPage,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    TestPage,
    ResultPage,
    ProfileComponent
  ],
  providers: [
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SharedDataService
  ]
})
export class AppModule {}
