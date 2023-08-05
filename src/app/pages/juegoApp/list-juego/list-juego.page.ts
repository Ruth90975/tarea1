import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { PalabraModel,PalabraContenidoModel, gameModel } from 'src/app/models/Palabras.model';
import { User } from 'src/app/models/User.model';
import { DatabaseService } from 'src/app/services/database.service';
import { InfoService } from 'src/app/services/info.service';
import { Platform } from '@ionic/angular';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';



@Component({
  selector: 'app-list-juego',
  templateUrl: './list-juego.page.html',
  styleUrls: ['./list-juego.page.scss'],
})
export class ListJuegoPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private databaseService: DatabaseService,
    private infoService: InfoService,
    private platform: Platform,
    private  authenticationService:  AuthenticationService

  ) { }

  clave: any;
  infoUsuario:any;
  num:number=0
  async ngOnInit() {
    this.infoUsuario="h"
    this.clave = this.route.snapshot.paramMap.get('clave'); // clave Usuario
    this.infoUsuario=  this.loadUserDataFromLocalStorage();
    
    //console.log(this.clave) //clave se usuario
    this.verObjetoTotal();
    this.getUser();
    //this.infoUsuario= JSON.parse(localStorage.getItem(this.clave) || '{}');
   
    console.log("hi2: "+ this.infoUsuario.email)
   // this.createGameDoc()
    this.getGame()

    await this.getGame2()

   // console.log("game2: "+this.infoGame2)
  }
  
  loadUserDataFromLocalStorage() {
    // Cargar datos desde el localStorage y guardarlos en this.infoUsuario
    this.infoUsuario = JSON.parse(localStorage.getItem(this.clave) || '{}');
    return this.infoUsuario
  }

  obj :any;
  estado:string="";
  verObjetoTotal(){
      this.databaseService.getCollection<PalabraModel>("objeto").subscribe(res =>{
  
        if(res){
          this.obj=res;

         // console.log(this.obj)
        //  this.estado=this.obj
          //console.log(this.obj[0].contenido[0].name)
        }

      });
      //console.log(this.databaseService.getCollection("objeto"))
  }

  parametro(a:any){
    this.getUser();
    //console.log(this.infoUser)
    this.router.navigate(['/game', a]);

    this.infoService.setNameObjto(a);
  }


  infoUser:any;
  
  getUser(){
    
    this.databaseService.getDoc<User>("usuario",this.clave).subscribe(res =>{
      if(res){
        this.infoUser = res;
        //guardar info en un servicio
        this.infoService.setInfoUser(this.infoUser)

       // console.log(this.infoUser)
      }
    })
    
  }


infoGames:any
  getGame(){
    // console.log(id)
      this.databaseService.getDoc<gameModel>("game",this.clave).subscribe(res =>{
      if(res){
        this.infoGames=res
        const infoUsuario= JSON.parse(localStorage.getItem(this.clave) || '{}');
        infoUsuario.tema=this.infoGames.tema
        // Convertir el objeto a JSON y guardarlo en el localStorage
        localStorage.setItem(this.clave, JSON.stringify(infoUsuario));

        //console.log(this.infoGames)
     
        this.infoService.setInfoGame(this.infoGames)
      }
    }) 
  }


  infoGame2:any

  async getGame2(){
    try {
      const res = await firstValueFrom(this.databaseService.getDoc<gameModel>("game",this.clave));
      if (res) {
        this.infoGame2 = res;

        
      }
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
    }
  }

  salir(){
    this.authenticationService.logout()
    this.router.navigate(['/login']);
  }

}
