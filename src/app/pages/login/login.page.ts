import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatabaseService } from 'src/app/services/database.service';
import { User } from 'src/app/models/User.model';
import { ToastService } from 'src/app/services/toast.service';
import { gameModel } from 'src/app/models/Palabras.model';

import {  Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { firstValueFrom } from 'rxjs';


//import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    passs: new FormControl('', Validators.required),
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
  
  // usuarios: User[] = []; 

  private path= 'usuario/';
  constructor(
    private databaseService: DatabaseService,
    private toastService: ToastService,
    private router: Router,
    private authenticationService:AuthenticationService,
  ) { }

  ngOnInit() {
   // this.handleGoogleRedirect();
    
  }

  //-----------------------------------Android--------------------------------------------------------------
  result: any
  async loginGoogle1() {
    
    this.result = await this.authenticationService.loginGoogleAndroid();
    if (this.result && this.result.user) {
      const user = this.result.user;
      const displayName = user.displayName; // Nombre del usuario
      const email = user.email; // Correo electrónico del usuario (Gmail)
      console.log('Nombre del usuario:', displayName);
      console.log('Correo electrónico:', email);
      // Aquí puedes manejar la información del usuario como desees
    } else {
      console.log('Inicio de sesión con Google fallido.');
    }

    console.log("hola")
  }

/*   async loginGoogleAndroid3(){
    const res= await this.authenticationService.loginGoogleAndroid();
    return res

  } */
//-----------------------------------Android--------------------------------------------------------------

  async loginGoogle(){
    
    const res= await this.authenticationService.loginGoogle();
    
    if (res?.user) {
      const IDuser = res.user.uid;
      console.log(res?.user?.displayName)
      console.log(res?.user?.updatePassword)
    
      console.log("id: "+ IDuser)
      const b = await this.checkUserExists(IDuser)

      if(b){
        console.log("B existe usuario")
        const res= await this.getUser(String(IDuser ))
        this.router.navigate(['/list-juego', IDuser]);

      }else{

        if(this.authenticationService.getUI()!=null){
          const ID= await this.authenticationService.getUI()
          if(ID){
            this.NewUser = {
              nombre: res?.user?.displayName!,
              email: res?.user?.email!,
              contrasenia:"",
              puntuacion: 0,
              foto:'',
              id: ID,
              rol: 'user',
              usuario: "privado"
            }
            const id= this.NewUser.id;
            this.databaseService.createDoc(this.NewUser,this.path,id);

            const miObjeto = { 
              nombre: res?.user?.displayName!,
              email: res?.user?.email!, 
              puntuacion: 0,
              tema: "fondo1.png",
              rol: 'user',
            };
            // Convertir el objeto a JSON y guardarlo en el localStorage
           // localStorage.setItem(IDuser, JSON.stringify(miObjeto));
            await this.localStore(IDuser,miObjeto)
    
            await this.createGameDoc()

            console.log("ya esta")
           // this.toastService.presentToast('Guardado Exitoso', 2000, 'middle');
           this.router.navigate(['/list-juego', IDuser]);

          }
        }

      }
   }
}

async localStore(id:string , obj:any){
   const a= localStorage.setItem(id, JSON.stringify(obj));
   return a
}

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


  async checkUserExists(userId: string): Promise<any> {
    try {
     // const userDoc = await firstValueFrom(this.databaseService.getDoc1<User>(this.path, userId));
      const res = await firstValueFrom(this.databaseService.getDoc<User>("usuario", userId));
  
      return res; // Return true if userDoc exists, false if it's null or undefined
    } catch (error) {
      console.error('Error al comprobar si el usuario existe:', error);
      return false;
    }
  }




  /* async loginGoogle(){
    //this.authenticationService.loginGoogle();

   const res= this.authenticationService.GoogleExis();
  console.log(res)

  } */

  // <>paramtetro del tipo de dato que usa 

 /*  submit(){
    this.databaseService.getCollection<User>(this.path).subscribe(
      res =>{ //funcion anonima 
        this.usuarios=res;
        if(this.usuarios!=null){
          for (let i = 0; i <this.usuarios.length; i++) {
            if(this.usuarios[i].nombre==this.formLogin.controls.email.value
              && this.usuarios[i].contrasenia==this.formLogin.controls.passs.value ){
                
                this.router.navigate(['/list-juego', this.usuarios[i].contrasenia]);
                this.toastService.presentToast('hola wix', 3000, 'top');
              }else {
                this.toastService.presentToast('Datos incorrectos', 3000, 'top');
              }
            
          }
        }
    
      }
    );
  } */


  async validarUser(){
    try{
      if(this.formLogin.controls.email.value && this.formLogin.controls.passs.value){
        const user= await this.authenticationService.login(
          this.formLogin.controls.email.value,
          this.formLogin.controls.passs.value)
          if(user){
            //obtener id
            if(this.authenticationService.getUI()!=null){
              const ID= await this.authenticationService.getUI()
              var Data = localStorage.getItem(String(ID));
              if (!Data) {
                const res= await this.getUser(String(ID))
                var DataUser = JSON.parse(localStorage.getItem(String(ID)) || '{}');
              
                if(DataUser.rol==="admin"){
                  this.router.navigate(['/add-palabras', ID]);
                }

                if(DataUser.rol==="user"){
                  this.router.navigate(['/list-juego', ID]);
                }
              }

              var DataUser = JSON.parse(localStorage.getItem(String(ID)) || '{}');
              if(DataUser.rol==="admin"){
                this.router.navigate(['/add-palabras', ID]);
              }

              if(DataUser.rol==="user"){
                this.router.navigate(['/list-juego', ID]);
              }
             // this.router.navigate(['/list-juego', ID]);
              //this.router.navigate(['/add-palabras', ID]);
              
            }
          }
      }

    }catch(error: any){
        if(error.code== 'auth/user-not-found') {
          this.toastService.presentToast('Usuario o contraseña incorrecto', 3000, 'top');
        }
        if (error.code== 'auth/wrong-password'){
          this.toastService.presentToast('Usuario o contraseña incorrecto', 3000, 'top');
        }
      }
  }

  

  infoUser:any
  async getUser(id: string): Promise<any> {
    try {
      const res = await firstValueFrom(this.databaseService.getDoc<User>("usuario", id));
      if (res) {
        this.infoUser = res;
  
        const miObjeto = { 
          nombre: this.infoUser.nombre,
          email: this.infoUser.email, 
          puntuacion: this.infoUser.puntuacion,
          tema: "fondo1.png",
          rol: this.infoUser.rol,
        };
        // Convertir el objeto a JSON y guardarlo en el localStorage
        localStorage.setItem(this.infoUser.id, JSON.stringify(miObjeto));
      }
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
    }
  }

}



























