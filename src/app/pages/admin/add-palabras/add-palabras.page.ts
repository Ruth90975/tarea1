import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PalabraModel} from 'src/app/models/Palabras.model';

import { DatosPalabrasServices } from 'src/app/services/datosPalabras.services';
import { DatabaseService } from 'src/app/services/database.service';
import { ToastService } from 'src/app/services/toast.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-palabras',
  templateUrl: './add-palabras.page.html',
  styleUrls: ['./add-palabras.page.scss'],
})
export class AddPalabrasPage implements OnInit {

  formAddPalabra = new FormGroup({
    objeto:new FormControl('', Validators.required),
  });

  constructor(
    private databaseService: DatabaseService,
    private datosPalabraService: DatosPalabrasServices,
    private toastService:ToastService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  DataUser:any
  clave:any
  ngOnInit() {
    this.verPal();
    this.clave = this.route.snapshot.paramMap.get('clave'); // clave Usuario
    this.DataUser = JSON.parse(localStorage.getItem(this.clave) || '{}');
  
  }

objeto: any;
palabra:any;

  addPalabra(){
    this.objeto = this.datosPalabraService.getPalabras();

    for (let i = 0; i <this.objeto.length; i++) {
      this.palabra = this.objeto[i];
      if(this.palabra.tipo==this.formAddPalabra.controls.objeto.value){
       // console.log('Tipo:', this.palabra.contenido);
        const data={
          contenido:this.palabra.contenido,
          name:this.palabra.tipo,
          dir:this.palabra.tipo +".png",
          estado: "inicio"
        }
      
        this.databaseService.createDoc(data,"objeto",this.palabra.tipo);
        this.toastService.presentToast('guardado Exitoso', 3000, 'top');
        break;
      
      }else{
        this.toastService.presentToast('No se puso guardar, el objeto ya Existe', 3000, 'top');
      }
    }
  }
  
  obj :any;
  verPal(){
      this.databaseService.getCollection<PalabraModel>("objeto").subscribe(res =>{
  
        if(res){
          this.obj=res;
          // console.log(this.obj[0].contenido[0].name)
        }
      });

      //console.log(this.databaseService.getCollection("objeto"))
  }




}
