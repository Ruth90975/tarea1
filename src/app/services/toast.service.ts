import { ToastController } from "@ionic/angular";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})

export class ToastService {
    constructor(private toasatCtrl: ToastController) { }

    async presentToast(message: string, duration: number, position: 'top' | 'bottom' | 'middle') {
        const toast = await this.toasatCtrl.create({
            message,
            duration,
            position
        });
        toast.present();
    }
}

