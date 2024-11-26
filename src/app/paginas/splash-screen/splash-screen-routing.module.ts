import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashScreenPage } from './splash-screen.page';

const routes: Routes = [
  {
    path: '',
    component: SplashScreenPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SplashScreenPageRoutingModule {}
