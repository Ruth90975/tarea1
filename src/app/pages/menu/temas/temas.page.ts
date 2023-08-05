import { Component, OnInit } from '@angular/core';
import { InfoService } from 'src/app/services/info.service';
import { TemasServices } from 'src/app/services/temas.services';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.page.html',
  styleUrls: ['./temas.page.scss'],
})
export class TemasPage implements OnInit {

  constructor(
    private  temasServices: TemasServices,
    private  infoService :  InfoService ,
    private  databaseService:DatabaseService,
    private toastService: ToastService,

  ) { }
  temas:any;
  infoUsuario:any
  clave:string=""

  ngOnInit() {
    this.getTems();
    this.clave= this.infoService.getInfoUser().id
    this.infoUsuario= JSON.parse(localStorage.getItem(this.clave) || '{}');
   // console.log(this.infoUsuario)
  }

  getTems(){
    this.temas = this.temasServices.getTemas();
    //console.log(this.temas)
  }


  data:any
  aplicar(temaNombre:string){
      //console.log(temaNombre)
      this.infoUsuario.tema=temaNombre
      localStorage.setItem(this.clave, JSON.stringify(this.infoUsuario));
      //Guardar datos fiebase
      this.data={
        tema:temaNombre
      }
      this.databaseService.updateDoc(this.data,"game",this.clave)
      this.toastService.presentToast('Actualizacion Exitosa', 2000, 'middle');
  }
}
