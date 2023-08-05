import { Injectable } from '@angular/core';
//angular
import { AngularFirestore } from '@angular/fire/compat/firestore/'; 


@Injectable({
  providedIn: 'root'
})
export class InfoService {

  infoUser :any;
  infoGame :any;
  posicion: number=0;
  nameObjeto?: string
  constructor( 
    public angularFirestore: AngularFirestore
  ) { }

  setInfoUser(dato:any){
    this.infoUser=dato;
  }

  setInfoGame(dato:any){
    this.infoGame =dato;
  }

  setPosicion(dato:number){
    this.posicion=dato;
  }

  getInfoUser(){
    return this.infoUser;
  }

  getPosicion(){
    return this.posicion;
  }

  getInfoGame(){
    return this.infoGame;
  }

  setNameObjto(dato:string){
   this.nameObjeto=dato;
  }

  getNameObjto(){
    return this.nameObjeto;
  }


}
