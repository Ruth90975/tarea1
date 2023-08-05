import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { gameModel } from 'src/app/models/Palabras.model';
import { User } from 'src/app/models/User.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { DatabaseService } from 'src/app/services/database.service';

import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.page.html',
  styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
  
  formAddUser = new FormGroup({
    name: new FormControl('', Validators.required),
    pass: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required,Validators.email]),
  
  });

  NewUser: User = {
    nombre:'',
    email: '',
    contrasenia:'',
    puntuacion: 0,
    foto:'',
    id:'',
    rol: 'user',
    usuario:"privado"
  }
  private path= 'usuario/';
  constructor(
    private databaseService: DatabaseService,
    private authenticationService :AuthenticationService,
    private toastService: ToastService,
    private router: Router,
  ) { }

  ngOnInit() {

  }


  async addUser(){
    if(this.authenticationService.getUI()!=null){
      const ID= await this.authenticationService.getUI()
      if(ID){
        this.NewUser = {
          nombre: this.formAddUser.controls.name.value,
          email: this.formAddUser.controls.email.value,
          contrasenia:this.formAddUser.controls.pass.value,
          puntuacion: 0,
          foto:'',
          id: ID,
          rol: 'user',
          usuario: "privado"
        }
        const id= this.NewUser.id;
        this.databaseService.createDoc(this.NewUser,this.path,id);

        this.createGameDoc()
        this.toastService.presentToast('Guardado Exitoso', 2000, 'middle');
      }

    }
  }

   // creando coleccion Game
   async createGameDoc(){
    const ID= await this.authenticationService.getUI()
    const data: gameModel={
      id: String(ID),
      tema:"fondo1.png",
      juego:[
          { objeto: "frutas",  estado: "inicio", posicion:0}
      ]
    }
    
    this.databaseService.createDoc(data,"game",data.id)
  }

  errorMensaje: string = '';

  async registrar(){ // registar con authentiticationfire
    try{
      const data:any = {
        email: this.formAddUser.controls.email.value,
        contrasenia:this.formAddUser.controls.pass.value,
      }
        const res= await this.authenticationService.registrar(data.email,data.contrasenia)
        //agregar user 
        this.addUser();
    
    }catch(error: any){

      if (error.code === 'auth/invalid-email') {
        this.errorMensaje = 'El formato del email es inválido.';
      } else if (error.code === 'auth/weak-password') {
        this.errorMensaje = 'La contraseña es demasiado débil.';
      } else {
        this.errorMensaje = 'Error al registrar el usuario. Por favor, inténtalo de nuevo más tarde.';
      }
    
    }
  }


}
