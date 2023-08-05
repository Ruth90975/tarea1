import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPalabrasPage } from './add-palabras.page';


const routes: Routes = [
  {
    path: '',
    component: AddPalabrasPage
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
   
  ],
  exports: [RouterModule],
})
export class AddPalabrasPageRoutingModule {}
