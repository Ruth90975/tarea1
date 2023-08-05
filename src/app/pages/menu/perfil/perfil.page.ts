import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/User.model';
import { firstValueFrom } from 'rxjs';
import { DatabaseService } from 'src/app/services/database.service';
import { InfoService } from 'src/app/services/info.service';
import { gameModel } from 'src/app/models/Palabras.model';

//import { Camera, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/camera';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private databaseService: DatabaseService,
    private infoService: InfoService,
    private toastService: ToastService,
  ) { }

  userId? :any 
  edit = false 
  clave?: string

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(" nombre"+  this.userId)  
    if(this.userId!==null){
      console.log( "id: "+ this.userId)
      this.infoUser = await this.getUser(this.userId)
     // console.log(" nombre"+ this.infoUser)   
    }
    this.clave = this.infoService.getInfoUser().id
    if(this.clave===this.userId){
      this.edit=true
    }
    this.getGame()

   // console.log(this.gameInfo)
    // console.log("clve: "+this.clave)
    //this.openGallery();
  }

  //------------------------------CAMERA-------------------------------------------------------------
image:string=""
  async editar(){
    const image = await Camera.getPhoto({
      resultType: CameraResultType.Base64, // Opciones: Base64, DataUrl, etc.
      source: CameraSource.Camera, // Opciones: Camera, Prompt, Photos, etc.
      quality: 90, // Calidad de la imagen (0-100)
  });
    // Aquí puedes manejar la imagen capturada
    if(image){
      //console.log(image.base64String); // Imprime el código Base64 de la imagen
     // this.image=image.base64String
      //this.guardarFoto(this.infoUser,image.base64String)
      const ress= await this.updateImg(image)

      console.log("esto es la URL :"+ ress)

      this.guardarUrl(this.infoUser,ress)
      this.toastService.presentToast('Guardando datos ...', 3000, 'middle');
    }
  }

  async updateImg(file: any) {
    const path = "user";
    const nombre = this.userId;
    const res = await this.databaseService.updateImg(file, path, nombre);
    return res;
  }
  

  imageData: string= "";

  async openGallery() {
    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos,
      });
  
      // `image` contiene la información de la imagen seleccionada de la galería
      // Puedes utilizar image.webPath para mostrar la imagen en tu aplicación
      this.imageData = image.webPath ?? "";
    } catch (error) {
      console.error('Error al seleccionar la imagen de la galería:', error);
    }
  }

  guardarUrl(infoUser:any,newfoto:string){
    infoUser.foto=newfoto
    this.databaseService.updateDoc(infoUser,"usuario", this.userId)
    ToastService
    //console.log("hecho");
  }
  
  
  
  //----------------------------------------------------------------------------------------

  infoUser:any
  async getUser(id: string): Promise<any> {
    try {
      const res = await firstValueFrom(this.databaseService.getDoc<User>("usuario", id));
      if (res) {
          return res;
      }
    } catch (error) {
      // Manejar el error aquí si es necesario
      console.error(error);
    }
  }

  gameInfo:any
  
  getGame(){
        const data = this.infoService.getInfoGame()
        interface JuegoItem {
          posicion: number;
          estado: string;
          objeto: string;
        }
        this.gameInfo = data.juego.filter((item:JuegoItem) => item.estado === 'terminado');
      //  this.infoUser = this.gameInfo.filter((game: gameModel) => game.juego[0].estado === 'terminado');
       // console.log(this.gameInfo)
  }

 


}


