import { LoadingController } from 'ionic-angular';
import { Injectable} from '@angular/core';

@Injectable()

export class Loading {

  constructor(public loadingCtrl: LoadingController) { }

  presentLoading() {
    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 3000
    });
    loader.present();
  }
}