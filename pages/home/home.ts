import { Component } from '@angular/core';
import { NavController , AlertController } from 'ionic-angular';
import { TestPage } from '../test/test'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {
  user:userData ={
    name:'',
    email:'',
    testType:''
  };
  listOfTest = [{
    id:1,
    code:'ng',
    name:'Angular'
  },
  {
    id:2,
    code:'js',
    name:'JavaScript'
  },
  {
    id:3,
    code:'css',
    name:'CSS Stlying'
  },
  {
    id:4,
    code:'ctet',
    name:'CTET'
  }
  ]
  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {

  }

  submitCheck() {
    if(this.user.name && this.user.email && this.user.testType){
      
      this.nextPage();
    } else{
      const alert = this.alertCtrl.create({
      title: 'Input required',
      subTitle: 'Please provide the data, fill the all fields ',
      buttons: ['OK']
    });
    alert.present();
    }
    
  }

nextPage()
{
  console.log(this.user);
this.navCtrl.push(TestPage,{
      data: this.user
    });
}

}

interface userData {
  name:string,
  email:string,
  testType:string
}
