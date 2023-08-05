import { Injectable } from '@angular/core';
//angular
import { AngularFirestore } from '@angular/fire/compat/firestore/';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  constructor(
    public angularFirestore: AngularFirestore,
    public angularFireStorage: AngularFireStorage
  ) {}

  createDoc(data: any, path: string, id: string) {
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<tipo>(path: string, id: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  async getDoc1<tipo>(path: string, id: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.angularFirestore.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.angularFirestore.createId();
  }
  // parametro = tipo
  getCollection<tipo>(path: string) {
    const collection = this.angularFirestore.collection<tipo>(path);
    return collection.valueChanges();
  }


  async updateImg(file: any, path: string, nombre: string): Promise<string> {
    // Convertir la imagen capturada a un Blob con tipo "image/png"
    const base64Response = await fetch(`data:image/png;base64,${file.base64String}`);
    const blobFile = await base64Response.blob();
  
    const filePath = path + '/' + nombre;
    const ref = this.angularFireStorage.ref(filePath);
    const task = ref.put(blobFile);
  
    return new Promise<string>((resolve, reject) => {
      task.snapshotChanges().pipe(
        finalize(async () => {
          const downloadUrl = await ref.getDownloadURL().toPromise();
          resolve(downloadUrl);
        })
      ).subscribe();
    });

  }








  /*   async updateImg1(file: any, path: string, nombre: string): Promise<string> {
    return new Promise((resolve) => {
      const filePath = path + '/' + nombre;
      const ref = this.angularFireStorage.ref(filePath);
      const task = ref.put(file);

      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((res) => {
              const Url = res;
              resolve(Url);
              return;
            });
          })
        )
        .subscribe();
    });
  } */



}
