import { Injectable } from '@angular/core';
//angula
import { AngularFireAuth } from '@angular/fire/compat/auth';

/* import { AngularFireAuth   } from '@angular/fire/compat/auth'; MODIFICADO */

import { GoogleAuthProvider } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor( 
    private angularFireAuth: AngularFireAuth,
  
   // private auth:Auth
    // private google:google
  ) { }

  async login(email:string, password:string){
    return await this.angularFireAuth.signInWithEmailAndPassword(email,password);
    //return user;
  }

  logout(){
    this.angularFireAuth.signOut();
  }

  async registrar(email:string, password:string){
    return await this.angularFireAuth.createUserWithEmailAndPassword(email,password);
  }
  
  async getUI(){
    const user= await this.angularFireAuth.currentUser;
      if(user === undefined ||user === null ){
          return null;
      }else{
        return user?.uid
      }
  }

  async loginGoogle() {
    try {
      const result = await this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
      return result
      // Manejar el resultado de inicio de sesión
    } catch (error) {
      // Manejar el error de inicio de sesión
      return null; 
    }
  }

  async loginGoogleAndroid() {
    try {
      const result = await this.angularFireAuth.signInWithRedirect(new GoogleAuthProvider());
      console.log("hia")
      return result;
      // Manejar el resultado de inicio de sesión en la redirección de vuelta
    } catch (error) {
      // Manejar el error de inicio de sesión
      return null; 
    }
  }
  


  async loginWithGoogle() {
    try {
      const result = await this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
      if (result.user) {
        // El usuario ha iniciado sesión exitosamente con Google
        console.log('Inicio de sesión con Google exitoso:', result.user);
        // Puedes redirigir al usuario a la página que desees después del inicio de sesión
        return result.user
      }
      return result.user

    } catch (error) {
      return null
      // Manejar el error de inicio de sesión con Google
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  async GoogleExis() {
    try {
      const result = await this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
      if (result.user) {
        // El usuario ha iniciado sesión exitosamente con Google
        console.log('Inicio de sesión con Google exitoso:', result.user);
        
        // Comprobar si el usuario es nuevo o ya existente
        if (result.additionalUserInfo?.isNewUser) {
          console.log('Es un usuario nuevo en Firebase. Puedes registrarlo si deseas.');
          // Aquí puedes llevar al usuario a una página de registro si lo deseas
        } else {
          console.log('El usuario ya existe en Firebase.');
          // Aquí puedes redirigir al usuario a la página que desees después del inicio de sesión
        }
  
        return result.user;
      }
      
      return null;
    } catch (error) {
      // Manejar el error de inicio de sesión con Google
      console.error('Error al iniciar sesión con Google:', error);
      return null;
    }
  }
  


  async validarEmailGoogle(email: string) {
    /*  const providers = await this.angularFireAuth.fetchSignInMethodsForEmail(email);
     // if (providers.includes('google.com')) {
        // El email está asociado a una cuenta de Google
        return providers.includes('google.com')
        //console.log('El email está asociado a una cuenta de Google');
     // }  */
  }

  loginGoogle5(){
    // return signInWithPopup(this.auth,new GoogleAuthProvider())
  }

 /*  async loginGoogle5() {
    try {
      const auth = getAuth();
      const result: UserCredential = await signInWithPopup(auth, new GoogleAuthProvider());
      // Manejar el resultado de inicio de sesión
    } catch (error) {
      // Manejar el error de inicio de sesión
    }
  } */


}
