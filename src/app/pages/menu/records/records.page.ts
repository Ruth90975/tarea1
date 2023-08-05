import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { User } from 'src/app/models/User.model';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';
import { InfoService } from 'src/app/services/info.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.page.html',
  styleUrls: ['./records.page.scss'],
})
export class RecordsPage implements OnInit {

  constructor(
    private databaseService: DatabaseService,
    private toastService: ToastService,
    private router: Router,
    private authenticationService:AuthenticationService,
    private alertController: AlertController,
    private infoService: InfoService,
  ) { }

  async ngOnInit() {

    this.getUser()
    //this.dateUser= "privado"
    this.dateUser=  await this.getTipoUsuario()
    if(this.dateUser.usuario==="privado"){
      this.presentAlert();
      console.log("dentro "+ this.dateUser.usuario)
    }
    console.log( "afuera "+ this.dateUser.foto)
   // this.getTipoUsuario()
    
  }

  infoUser:any
  async getUser(): Promise<any> {
    this.databaseService.getCollection<User>("usuario").subscribe(res =>{
  
      if(res){
        this.infoUser=res;
        this.infoUser = res.filter((user: User) => user.usuario === 'publico');
        this.infoUser.sort((a:User, b:User) => b.puntuacion - a.puntuacion);
      }
    });
  }
  
  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Unirme a la competencia',
      message: 'Al unirte a la competencia tu perfil sera visible al publico',
      buttons: ['OK'],
    });

    await alert.present();
  }

  dateUser:any
  

  async getTipoUsuario(): Promise<any> {
    try {
      const id= this.infoService.getInfoUser().id;
      const res = await firstValueFrom(this.databaseService.getDoc<User>("usuario", id));

      if (res) {
        this.dateUser = res;
        //this.dateUser= this.dateUser.usuario
      //  console.log(this.dateUser)
      return this.dateUser
        };
      
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
    }
  }

  unirme(){
    const id= this.infoService.getInfoUser().id;
    
    const data ={
      usuario:"publico",
    }
    this.databaseService.updateDoc(data,"usuario",id)
    
    this.ngOnInit()
  
  }

  /* async getUser(): Promise<User[]> {
    try {
      const collection: AngularFirestoreCollection<User> = this.databaseService.getCollection<User>("usuario");
      const res = await firstValueFrom(collection.valueChanges());
      if (res) {
        this.infoUser = res;
        return this.infoUser;
      }
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
    }
    return []; // Devolver un array vacío en caso de error
  } */

}
