import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPalabrasPageRoutingModule } from './add-palabras-routing.module';

import { AddPalabrasPage } from './add-palabras.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddPalabrasPageRoutingModule
  ],
  declarations: [AddPalabrasPage]
})
export class AddPalabrasPageModule {}
