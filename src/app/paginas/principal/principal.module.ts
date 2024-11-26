import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';
import { PrincipalPage } from './principal.page';

// Importa los componentes
import { CabezeraComponent } from '../../components/cabezera/cabezera.component';
import { MenuLateralComponent } from '../../components/menu-lateral/menu-lateral.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PrincipalPageRoutingModule,
  ],
  declarations: [
    PrincipalPage,
    CabezeraComponent, // Declara el componente cabezera
    MenuLateralComponent, // Declara el componente menu-lateral
  ],
  exports: [
    CabezeraComponent, // Exporta para uso externo si es necesario
    MenuLateralComponent, // Exporta para uso externo si es necesario
  ],
})
export class PrincipalPageModule {}
