import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListJuegoPage } from './list-juego.page';

const routes: Routes = [
  {
    path: '',
    component: ListJuegoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListJuegoPageRoutingModule {}
