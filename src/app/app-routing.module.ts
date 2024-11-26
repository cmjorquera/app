import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash-screen', // Redirige a splash-screen
    pathMatch: 'full'
  },
  {
    path: 'splash-screen',
    loadChildren: () => import('./paginas/splash-screen/splash-screen.module').then(m => m.SplashScreenPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./paginas/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'principal',
    loadChildren: () => import('./paginas/principal/principal.module').then(m => m.PrincipalPageModule)
  },
  {
    path: 'crear-usuario',
    loadChildren: () => import('./paginas/crear-usuario/crear-usuario.module').then(m => m.CrearUsuarioPageModule)
  },
  {
    path: 'cambio-pass',
    loadChildren: () => import('./paginas/cambio-pass/cambio-pass.module').then( m => m.CambioPassPageModule)
  },
  {
    path: 'modificar-usuario',
    loadChildren: () => import('./paginas/modificar-usuario/modificar-usuario.module').then( m => m.ModificarUsuarioPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
