import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListJuegoPageRoutingModule } from './list-juego-routing.module';

import { ListJuegoPage } from './list-juego.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListJuegoPageRoutingModule
  ],
  declarations: [ListJuegoPage]
})
export class ListJuegoPageModule {}
