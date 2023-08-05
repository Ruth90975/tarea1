import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  
  {
    path: 'add-user',
    loadChildren: () => import('./pages/add-user/add-user.module').then( m => m.AddUserPageModule)
  },
  {
    path: 'list-juego/:clave',
    loadChildren: () => import('./pages/juegoApp/list-juego/list-juego.module').then( m => m.ListJuegoPageModule)
  },
  {
    path: 'add-palabras/:clave',
    loadChildren: () => import('./pages/admin/add-palabras/add-palabras.module').then( m => m.AddPalabrasPageModule)
  },
  {
    path: 'game/:clave',
    loadChildren: () => import('./pages/juegoApp/game/game.module').then( m => m.GamePageModule)
  },
  {
    path: 'temas',
    loadChildren: () => import('./pages/menu/temas/temas.module').then( m => m.TemasPageModule)
  },
  {
    path: 'records',
    loadChildren: () => import('./pages/menu/records/records.module').then( m => m.RecordsPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./pages/menu/perfil/perfil.module').then( m => m.PerfilPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
