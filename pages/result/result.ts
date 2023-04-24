import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProfileComponent } from '../../pages/profile/profile.component';


@Component({
  selector: 'page-result',
  templateUrl: 'result.html'
})
export class ResultPage {
  user = {}
  resultData = {}

  constructor(public navCtrl: NavController, public navParam: NavParams ) {
      this.resultData = this.navParam.get('data');
  }


    /**
    * @author acharyaks90
    * @description Finish the test
    * @method
    */
  completeTest(){
    this.navCtrl.push(ProfileComponent,{
    });
  }


  

}
