import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {PalabraContenidoModel, gameModel } from 'src/app/models/Palabras.model';
import { DatabaseService } from 'src/app/services/database.service';
import { InfoService } from 'src/app/services/info.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  puntaje: number=0;  // scrore del juego
  posicion: number=0; // pisicion del objeto de frutas, profesion ,etc
  palabra: string=""; // manzana, etc
  carater: string = ''; // caracter de una palabra
  caracteres :string[]=[]; // conjunto de caracteres de una palabra ejemplo= manzana =>M a n z a n a 
  puntUser:number=0 //puntaje del usuario actual base de datos
  data:any
  botonClicked: string | boolean = false;
  nombreBoton: string=""
  /* nombreTema="atardecer.png" */
  nombreTema="fondo1.png"
  click=false;

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private toastService: ToastService,
    private infoService: InfoService,
    private router: Router,
  ) { }

  clave:any;
  puntaje2:any;
  dataGame:any
  
  ngOnInit() {
    this.nombreTema=JSON.parse(localStorage.getItem(this.ID) || '{}').tema
    //console.log(this.nombreTema)
    this.clave = this.route.snapshot.paramMap.get('clave'); // clavedelobjeto
    //this.dataGame = this.infoService.getInfoGame();
    //console.log(this.clave)

    this.verObjeto();
    //this.getScore();

    this.puntaje2= JSON.parse(localStorage.getItem(this.ID) || '{}').puntuacion;
   // console.log("puntuacion"+this.puntaje2)
    this.puntaje=parseInt(this.puntaje2)

    this.posicion = this.getPuntuacion();
 
  
    //this.setGameUser()

  }

  getPuntuacion(){

    const data = this.infoService.getInfoGame();
    var pos= 0
      for (let i = 0; i < data.juego.length; i++) {
        if (data.juego[i].objeto === this.clave) {
            pos = data.juego[i].posicion
          break;
        }
      }
    return pos
  }

  verProcesoGame(){

    const data = this.infoService.getInfoGame();
    var pos= 1
      for (let i = 0; i < data.juego.length; i++) {
        if (data.juego[i].objeto === this.clave && data.juego[i].estado==="terminado") {
            pos = 0
          break;
        }
      }
    return pos
  }

  setGameUser(Estado:string, Posicion:number){
     
      const id = this.infoService.getInfoUser().id;
      const data = this.infoService.getInfoGame();

     // console.log("game" + data.juego[0].objeto);
    
      const objetoNuevo = { objeto: this.clave , estado: Estado, posicion: Posicion };
      let objetoExistente = false;
    
      for (let i = 0; i < data.juego.length; i++) {
        if (data.juego[i].objeto === objetoNuevo.objeto && data.juego[i].estado==="inicio" ) {
          // El objeto ya existe, actualiza sus valores
          data.juego[i].estado = objetoNuevo.estado;
          data.juego[i].posicion= objetoNuevo.posicion; 
          objetoExistente = true;
          break;
        }
      }
    
      if (!objetoExistente) {
        // El objeto no existe, agrégalo al array
        data.juego.push(objetoNuevo);
      }
    
      this.databaseService.createDoc(data, "game", id);
     
  }


  objeto:any =[];
  objs: PalabraContenidoModel[]=[]
  valor:string =""

  verObjeto(){
    const id= this.route.snapshot.paramMap.get('clave') || '{}';
    this.databaseService.getDoc("objeto",id).subscribe(obj =>{
        if(obj){
            this.objeto=obj;
            this.objeto=this.objeto.contenido; // actualizando variable
                  
            for(var i=0 ; i<this.objeto.length ; i++){
              this.objs[i] = {
                id: i,
                name: this.objeto[i].name
              };

              /* if(i==0){
                this.palabra=this.objeto[i].name;
                this.caracteres=(this.palabra.split('')).sort(() => Math.random() - 0.5)
              } */
           // console.log(this.objeto[i].name) 
            }
             const a = this.verProcesoGame();
             if(a===1){
              this.siguiente();
             }else{
              //const id = this.infoService.getInfoUser().id
              //console.log ("terminaste"+ id)
              this.toastService.presentToast('Completaste tu leccion', 2000, 'middle');
              // this.router.navigate(['/list-juego', id]);
             }
           // console.log(this.objeto.length) 
        }
    })
  }



   enviarValor(valor:string){
    //this.valor=this.valor + a;

    if(valor=="0"){
      this.valor= (this.valor.slice(0, -1))
      this.carater=this.carater.slice(0,-1)

      if(this.carater.length>this.palabra.length){
        this.carater="";
        this.valor="";
      }
      
    }else{
        this.valor  =this.valor+ valor ; // Asigna el valor a la variable
        this.carater=this.carater+valor;
      
        this.click=true;
        this.botonClicked=valor;
    
        if(this.carater.length>this.palabra.length){
          
          this.carater="";
          this.valor="";
          this.toastService.presentToast('ERROR', 2000, 'middle');
          
        }

        if(this.carater==this.palabra){
          this.palabra="";
          this.carater="";
          this.valor="";
          this.toastService.presentToast('Felicidades, es correcto', 2000, 'middle');
          this.puntaje=this.puntaje + 1;
          this.posicion=this.posicion + 1;
          this.siguiente();
          this.setScoreLocal(this.puntaje);
          this.setScore();
          //console.log("ff"+this.puntaje)
        }
    }


  }

  siguiente(){

    //const data = this.infoService.getInfoGame();

    if(this.posicion<this.objs.length){

      this.palabra=this.objs[this.posicion].name;
      this.caracteres =((this.objs[this.posicion].name).split('')).sort(() => Math.random() - 0.5);
      this.setGameUser("inicio",this.posicion)

    }
    else {
      this.palabra="";
      this.caracteres=[]
      this.setGameUser("terminado",this.posicion)
    }
  }

  infoUser:any;

  ID=this.infoService.getInfoUser().id

  setScoreLocal(a:any){
    const id= this.infoService.getInfoUser().id;
    var objetoGuardado = JSON.parse(localStorage.getItem(id) || '{}');
    //var objetoGuardado = localStorage.getItem(id);
    if(objetoGuardado){
        objetoGuardado.puntuacion=a
      localStorage.setItem(id, JSON.stringify(objetoGuardado));
    }
    else{
      //guardar info en localstorage
    const miObjeto = { nombre: 'ruth553', puntuacion: a , ro:"gg"};
    // Convertir el objeto a JSON y guardarlo en el localStorage
    localStorage.setItem(id, JSON.stringify(miObjeto));
    }
  } 

  setScore(){
    this.data={
      puntuacion:this.puntaje
    }
    const id= this.infoService.getInfoUser().id;
    this.databaseService.updateDoc(this.data,"usuario",id)
    console.log("hola setg escore")
  } 


  setPalabraEstado(){
    const data ={
      estado:"terminado"
    }
   // this.databaseService.updateDoc(data,"objeto",this.clave)
  }

  guardarPosicicion(posicion:number){
    this.infoService.setPosicion(posicion)
  }


  
}
